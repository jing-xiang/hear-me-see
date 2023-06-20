 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import {
   getAuth,
   createUserWithEmailAndPassword,
 } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
 
 // https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAeAl3FUH0PGDWToUzSqhKfj4af-RR-8ok",
    authDomain: "hear-me-see.firebaseapp.com",
    databaseURL: "https://hear-me-see-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hear-me-see",
    storageBucket: "hear-me-see.appspot.com",
    messagingSenderId: "28925318865",
    appId: "1:28925318865:web:77ec8aa82bf8c877a1d7f0",
    measurementId: "G-WN6MKN9KBQ"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth()


 var fullName = document.getElementById("fullname");
 var contact = document.getElementById("contact");
 var email = document.getElementById("email");
 var password = document.getElementById("password");
 var copassword = document.getElementById("copassword")
 window.signup = function (e) {
 if(password)
 
     if(fullName.value == "" || contact.value=="" || email.value =="" || password.value ==""){
         alert("All Field Are Required")
     }
     if(password.value == copassword.value){
      
     }
     else{
         alert("Password Confirmation is Wrong")
         return false
     }
 
     e.preventDefault();
     var obj = {
       firstName: fullName.value,
       contact: contact.value,
       email: email.value,
       password: password.value,
     };
   
     createUserWithEmailAndPassword(auth, obj.email, obj.password)
     .then(function(success){
         window.location.replace('HTML/login.html')
       // console.log(success.user.uid)
       alert("signup successfully")
     })
     .catch(function(err){
       alert("Error in " + err)
     });
    console.log()
     console.log(obj);
   };