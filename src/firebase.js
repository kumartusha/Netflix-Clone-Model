import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA5HXsjhIsZ3qFcjCllfPIyTlJPKKk-uxM",
  authDomain: "netflix-clone-d3bdf.firebaseapp.com",
  projectId: "netflix-clone-d3bdf",
  storageBucket: "netflix-clone-d3bdf.appspot.com",
  messagingSenderId: "329187885147",
  appId: "1:329187885147:web:b63c7ff637f67956803f7e",
  measurementId: "G-W6JQWYCMJB"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


// SignUp
const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(Error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


//Login
const login = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



// LogOut
const logout = ()=>{
    signOut(auth);
}


export {auth, db, login, signup, logout};
