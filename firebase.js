import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
//storage
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCJx9Ny0SHnbYhnc99EAFJFDUZJOy3RU9g",
  authDomain: "vogue-runway.firebaseapp.com",
  projectId: "vogue-runway",
  storageBucket: "vogue-runway.appspot.com",
  messagingSenderId: "518937108762",
  appId: "1:518937108762:web:8d17b95e6aad44be800ca3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, db, storage };
