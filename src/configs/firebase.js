// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebse/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYjneE70Gj_t4bDSMRNk12Mc0WuwSrZes",
  authDomain: "vue-trainning.firebaseapp.com",
  databaseURL:
    "https://vue-trainning-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vue-trainning",
  storageBucket: "vue-trainning.appspot.com",
  messagingSenderId: "117918136793",
  appId: "1:117918136793:web:9d02a8778186ac764341c8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fireStoreCore = firebase.firestore();

export { fireStoreCore };
