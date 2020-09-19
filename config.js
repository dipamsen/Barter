import firebase from 'firebase';
import "@firebase/firestore"

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBsGNddY_OfC0n38YQdnhyFD2fIjYHH3O4",
    authDomain: "buzzer-app-c82ce.firebaseapp.com",
    databaseURL: "https://buzzer-app-c82ce.firebaseio.com",
    projectId: "buzzer-app-c82ce",
    storageBucket: "buzzer-app-c82ce.appspot.com",
    messagingSenderId: "650438068478",
    appId: "1:650438068478:web:e1ea15e1c89866ea0bbdaf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()