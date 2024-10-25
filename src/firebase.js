
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword, signOut}  from  "firebase/auth";
import {addDoc ,getFirestore,collection} from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyAhf8r6NuUnM4uJl5AH0uOSoTpwWWsuKg4",
  authDomain: "netflix-clone-72a58.firebaseapp.com",
  projectId: "netflix-clone-72a58",
  storageBucket: "netflix-clone-72a58.appspot.com",
  messagingSenderId: "796061423192",
  appId: "1:796061423192:web:b0559edf1e217d1df6dc2d",
  measurementId: "G-KQG5SYGCP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);


//creating signup funtion in firebase
const signup =async (name,email,password)=>{
    try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,'user'),{
        uid:user.uid,
        name,
        authProvider:'local',
        email,
    });
    }
    catch(error){
          console.log(error)
          toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

//login using firebase

const login = async (email,password)=>{
   try{
    await signInWithEmailAndPassword(auth,email,password);

   }
   catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
   }
   
}

const logout =()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};