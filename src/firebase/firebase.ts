import * as firebase from "firebase";

// Initialize Firebase
const devConfig = {
  apiKey: "AIzaSyC7cNjmckO0ljwsCX5nGDVM9KKLi1ZYzRc",
  authDomain: "nowmanagersources.firebaseapp.com",
  databaseURL: "https://nowmanagersources.firebaseio.com",
  messagingSenderId: "137663533318",
  projectId: "nowmanagersources",
  storageBucket: "nowmanagersources.appspot.com"
};

const prodConfig = {
  apiKey: "AIzaSyC7cNjmckO0ljwsCXBROKEN5nGDVM9KKLi1ZYzRc",
  authDomain: "nowmanaBROKENgersources.firebaseapp.com",
  databaseURL: "https://nowmanagersources.firebaseio.com",
  messagingSenderId: "137663533318",
  projectId: "nowmanagersources",
  storageBucket: "nowmanagersources.appspot.com"
};


export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/landing'

};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;


const firebaseApp = firebase.initializeApp(config);

const auth = firebase.auth();

export {
  auth
};

export default firebaseApp;
