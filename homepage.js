// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import{getAuth, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
import {getFirestore, getDoc,doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// const firebaseConfig = {
//     iKey: "AIzaSyC5z-RWoa7pxkw4AxZwQCBive0a2fKWE4M",
//     authDomain: "authentication-b863b.firebaseapp.com",
//     databaseURL: "https://authentication-b863b-default-rtdb.firebaseio.com",
//     projectId: "authentication-b863b",
//     storageBucket: "authentication-b863b.appspot.com",
//     messagingSenderId: "177022509368",
//     appId: "1:177022509368:web:c0dbfcbe0da06d514161cd"
//   };

const firebaseConfig = {
    apiKey: "AIzaSyC5z-RWoa7pxkw4AxZwQCBive0a2fKWE4M",
    authDomain: "authentication-b863b.firebaseapp.com",
    databaseURL: "https://authentication-b863b-default-rtdb.firebaseio.com",
    projectId: "authentication-b863b",
    storageBucket: "authentication-b863b.appspot.com",
    messagingSenderId: "177022509368",
    appId: "1:177022509368:web:c0dbfcbe0da06d514161cd"
};
 

//2
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
//   import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
//   import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyCCXnTWjMmStJRYUXISIRJM4iIH9tPqO0c",
//     authDomain: "login-b0cbb.firebaseapp.com",
//     projectId: "login-b0cbb",
//     storageBucket: "login-b0cbb.appspot.com",
//     messagingSenderId: "851259146025",
//     appId: "1:851259146025:web:76c09815b8eddbf68c4138"
//   };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })