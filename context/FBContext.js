import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { createContext, useCallback, useEffect, useState } from 'react';

import { auth, db, provider, storage } from '../firebase';

function uid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

const FBContext = createContext();

const FBContextProvider = ({ children }) => {
  const [favArticles, setFavArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addUserToDB = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });
    }
  };

  const signIn = useCallback(async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      // const token = credential.accessToken;
      const user = response.user;
      setCurrentUser(user);
      addUserToDB(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setFavArticles([]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addFavArticle = useCallback(
    async (article) => {
      if (!currentUser) {
        setFavArticles([]);
        return;
      }
      const userRef = doc(db, "users", currentUser.uid);
      const favArticlesRef = collection(userRef, "favorites");

      if (favArticles.some((fav) => fav.slug === article.slug)) {
        //find in firebase and delete
        const docRef = await getDocs(collection(userRef, "favorites"));
        docRef.forEach((doc) => {
          if (doc.data().slug === article.slug) {
            deleteDoc(doc.ref)
              .then(() => {
                setFavArticles((prev) =>
                  prev.filter((fav) => fav.slug !== article.slug)
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
        return;
      }

      await addDoc(favArticlesRef, article);
      setFavArticles((prev) => [...prev, article]);
      return { type: "success", message: "Article added to favorites" };
    },
    [currentUser, favArticles]
  );

  const updateUsername = useCallback(
    async (name) => {
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, { displayName: name });
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, { name }, { merge: true });
        setCurrentUser((prev) => ({ ...prev, displayName: name }));
        setLoading(false);
        return { type: "success", message: "Username updated" };
      } catch (error) {
        // console.log(error);
        setLoading(false);
        return {
          type: "error",
          message: "There was an error updating your username",
        };
      }
    },
    [currentUser]
  );

  const uploadToStorage = useCallback(
    async (file) => {
      try {
        setLoading(true);
        const storageRef = ref(storage, `images/${currentUser.uid}/${uid()}`);
        const snapshot = await uploadString(storageRef, file, "data_url");
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        await updateProfile(auth.currentUser, { photoURL: url });
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, { avatar: url }, { merge: true });
        setCurrentUser((prev) => ({ ...prev, photoURL: url }));
        setLoading(false);
        return { type: "success", message: "Avatar updated" };
      } catch (error) {
        setLoading(false);
        return {
          type: "error",
          message: "There was an error updating your avatar",
        };
      }
    },
    [currentUser]
  );

  useEffect(() => {
    const getFaves = async () => {
      if (!currentUser) return;
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const favesRef = collection(userRef, "favorites");
        const favesSnapshot = await getDocs(favesRef);
        if (favesSnapshot.empty) return;
        const faves = favesSnapshot.docs.map((doc) => doc.data());
        setFavArticles(faves);
        return faves;
      } catch (error) {
        console.log(error);
      }
    };
    getFaves();
  }, [currentUser]);

  return (
    <FBContext.Provider
      value={{
        signIn,
        logOut,
        currentUser,
        loading,
        addFavArticle,
        favArticles,
        updateUsername,
        uploadToStorage,
      }}
    >
      {children}
    </FBContext.Provider>
  );
};

export { FBContext, FBContextProvider };
