import { createContext, useState, useCallback, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, provider, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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
    },
    [currentUser, favArticles]
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
      }}
    >
      {children}
    </FBContext.Provider>
  );
};

export { FBContext, FBContextProvider };
