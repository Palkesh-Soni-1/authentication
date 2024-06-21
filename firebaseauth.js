import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyC5z-RWoa7pxkw4AxZwQCBive0a2fKWE4M",
    authDomain: "authentication-b863b.firebaseapp.com",
    databaseURL: "https://authentication-b863b-default-rtdb.firebaseio.com",
    projectId: "authentication-b863b",
    storageBucket: "authentication-b863b.appspot.com",
    messagingSenderId: "177022509368",
    appId: "1:177022509368:web:c0dbfcbe0da06d514161cd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById('google-login-btn');
googleLogin.addEventListener('click',function(){
    signInWithPopup(auth, provider)
    .then((result)=>{
        const credential= GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        window.location.href="homepage.html"
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})
const googleLogin1 = document.getElementById('google-login-btn1');
googleLogin1.addEventListener('click',function(){
    signInWithPopup(auth, provider)
    .then((result)=>{
        const credential= GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        window.location.href="homepage.html"
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})
function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }


 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const fName=document.getElementById('fName').value;
    const lichess =document.getElementById('rLichess').value;
    const mobile = document.getElementById('rMobile').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData={
            email:email,
            fName : fName,
            lichess:lichess,
            mobile:mobile,
            password:password
        };
        showMessage('Account Created Succesfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('Wrrong Credentials)', 'signUpMessage');
        }
    })
 });


 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })