import firebase from 'firebase'
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyD92rL3bv5A2gW7mSWGy7srxtEB7usZrjU",
    authDomain: "e-com-e5d80.firebaseapp.com",
    projectId: "e-com-e5d80",
    storageBucket: "e-com-e5d80.appspot.com",
    messagingSenderId: "642727810076",
    appId: "1:642727810076:web:6c259e572da532ec83bbd9",
    measurementId: "G-9LMR8MC4QE"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  export const db= firebase