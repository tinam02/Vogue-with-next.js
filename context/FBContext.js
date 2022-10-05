import { createContext, useState, useCallback, useEffect } from "react";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const FBContext = createContext();

const FBContextProvider = ({ children }) => {
  const current = auth.currentUser;
  const [users, setUsers] = useState([]);
  const [favArticles, setFavArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  const addUserToDB = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        favArticles: [],
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
      console.log("logo", currentUser);
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!current) return;
    if (current) setCurrentUser(current);
  }, [current]);

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const users = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const favArticlesRef = collection(db, "favorite_articles");
      const favArticlesSnapshot = await getDocs(favArticlesRef);
      const favArticles = favArticlesSnapshot.docs.map((doc) => doc.data());
      setFavArticles(favArticles);
    };
    getData();
  }, []);

  return (
    <FBContext.Provider
      value={{ signIn, logOut, users, currentUser, favArticles }}
    >
      {children}
    </FBContext.Provider>
  );
};

export { FBContext, FBContextProvider };
