import { createContext, useState, useCallback, useEffect } from "react";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { provider, db } from "../firebase";

//add to subcollection inside user
const addFavArticle = async (article) => {
  const userRef = doc(db, "users", currentUser.uid);
  const favArticlesRef = collection(userRef, "favArticles");
  await setDoc(favArticlesRef, {
    article,
  });
};
