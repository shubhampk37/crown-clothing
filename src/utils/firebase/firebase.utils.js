// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-uXhUa4Slq0QulzSrpz-te30bEyXtles",
  authDomain: "crown-clothing-db-6e6df.firebaseapp.com",
  projectId: "crown-clothing-db-6e6df",
  storageBucket: "crown-clothing-db-6e6df.appspot.com",
  messagingSenderId: "958532449642",
  appId: "1:958532449642:web:8d735643bfa1c0e873e113"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) =>{
    if(!userAuth)return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password)return;
    return createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password)return;
    return signInWithEmailAndPassword(auth, email, password);
}