import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC7cNjmckO0ljwsCX5nGDVM9KKLi1ZYzRc",
  authDomain: "nowmanagersources.firebaseapp.com",
  databaseURL: "https://nowmanagersources.firebaseio.com",
  messagingSenderId: "137663533318",
  projectId: "nowmanagersources",
  storageBucket: "nowmanagersources.appspot.com"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
