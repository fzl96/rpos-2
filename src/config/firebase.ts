// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKy2QPPjCkGjvPxQv31pqsFcSQ5AWd69c',
  authDomain: 'posale-e3c98.firebaseapp.com',
  projectId: 'posale-e3c98',
  storageBucket: 'posale-e3c98.appspot.com',
  messagingSenderId: '988883353209',
  appId: '1:988883353209:web:8c8f4f8beee0eb1ebb9ea8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export { auth, db, storage };

export default app;
