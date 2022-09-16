import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDteIwVz3Zx9lHx6OPGC4yu3xQ-IYV4nnw",
  authDomain: "messenger-b1fab.firebaseapp.com",
  projectId: "messenger-b1fab",
  storageBucket: "messenger-b1fab.appspot.com",
  messagingSenderId: "301197225697",
  appId: "1:301197225697:web:f1408e113f16bf282d51a0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
