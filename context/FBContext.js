import { createContext, useState, useCallback, useEffect } from "react";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const FBContext = createContext();

const FBContextProvider = ({ children }) => {
  const current = auth.currentUser;
  const [users, setUsers] = useState([]);
  const [favArticles, setFavArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  console.log(currentUser);
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
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        setCurrentUser(user);
        addUserToDB(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  useEffect(() => {
    if (current === null) return;

    setCurrentUser(current);
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
    <FBContext.Provider value={{ signIn, users, currentUser, favArticles }}>
      {children}
    </FBContext.Provider>
  );
};

export { FBContext, FBContextProvider };
