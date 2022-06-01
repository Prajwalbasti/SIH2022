import firebase from "firebase";



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDNQ93XwQ-eDTlc5AROpNBaMSroXzjEZpk",
    authDomain: "npg-pf-167f7.firebaseapp.com",
    projectId: "npg-pf-167f7",
    storageBucket: "npg-pf-167f7.appspot.com",
    messagingSenderId: "999073753975",
    appId: "1:999073753975:web:48ee0fa6fcfe95d4090f72",
    measurementId: "G-D1EQ85R68J"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); 

export {db,auth,storage};