import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";
//qviq login
const app = firebase.initializeApp({
  // apiKey: "AIzaSyCqBAq65xnFSOOl1eUSubLZdSxGYzNtry0",
  // authDomain: "qviqlogin-986a4.firebaseapp.com",
  // projectId: "qviqlogin-986a4",
  // storageBucket: "qviqlogin-986a4.appspot.com",
  // messagingSenderId: "536638905123",
  // appId: "1:536638905123:web:8a0d6463a85d87e2cb4a96",
  // measurementId: "G-73FVGGC7NM",
  
    apiKey: "AIzaSyBEQlQjdAO4BEfOdWyXNdKkf5aeFMl59R8",
    authDomain: "qviqaccess.firebaseapp.com",
    projectId: "qviqaccess",
    storageBucket: "qviqaccess.appspot.com",
    messagingSenderId: "334790961252",
    appId: "1:334790961252:web:9d5ec7754ae3916d065771",
    measurementId: "G-0YRR6N0X6L"
  
});
export const auth = app.auth();
export default app;
export const storage = getStorage(app, "gs://qviqaccess.appspot.com");
