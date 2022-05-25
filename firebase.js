import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA0xdN4tnUJMo_eDBZYsv33X2Fu7MlGiN4",
    authDomain: "cipher-e7737.firebaseapp.com",
    databaseURL: "https://cipher-e7737-default-rtdb.firebaseio.com",
    projectId: "cipher-e7737",
    storageBucket: "cipher-e7737.appspot.com",
    messagingSenderId: "936238878862",
    appId: "1:936238878862:web:87dad9c8f5ff29cbfc39df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

export function signUp(email, password) {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
}

export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(userCredential);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export function cipherSubmitHandler(method, action, text) {
    console.log(auth.currentUser.uid);
    push(ref(database, `/saved_ciphers/${auth.currentUser.uid}`), {
        
        created_at: Date.now(),
        method,
        action,
        text,
    });
}