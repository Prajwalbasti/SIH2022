import firebase from "firebase";



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCW36uGc52gxzY_JYYNq1vUiAlj1sfc83U",
    authDomain: "max-poolers.firebaseapp.com",
    projectId: "max-poolers",
    storageBucket: "max-poolers.appspot.com",
    messagingSenderId: "1072114949549",
    appId: "1:1072114949549:web:a6064aa8107f8c893f9524",
    measurementId: "G-8XHCQ0K8QY"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); 

export {db,auth,storage};