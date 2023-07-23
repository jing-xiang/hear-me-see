// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";


   // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  const submitButton = document.getElementById("submit");
  const signupButton = document.getElementById("sign-up");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const main = document.getElementById("main");
  const createacct = document.getElementById("create-acct")
  
  const signupEmailIn = document.getElementById("email-signup");
  const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
  const signupPasswordIn = document.getElementById("password-signup");
  const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
  const createacctbtn = document.getElementById("create-acct-btn");
  
  const returnBtn = document.getElementById("return-btn");
  
  var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword, emailForReset;
  
  createacctbtn.addEventListener("click", function() {
    var isVerified = true;
  
    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    if(signupEmail != confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.")
        isVerified = false;
    }
  
    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if(signupPassword != confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.")
        isVerified = false;
    }
    
    if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
      window.alert("Please fill out all required fields.");
      isVerified = false;
    }
    
    if(isVerified) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        window.alert("Success! Account created.");
        VerificationEmail();
        window.alert('Verification email sent, please check your mailbox.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        window.alert("Error occurred! " + errorMessage); 
   
      });
    }
  });

  function VerificationEmail() {
    sendEmailVerification(auth.currentUser)
    .then(() => {
            // Email verification sent!
            console.log('Email Verification sent! Check your mailbox');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            window.alert("Error occurred! " + errorMessage);
        });
}

  
  submitButton.addEventListener("click", function() {
    email = emailInput.value;
    console.log(email);
    password = passwordInput.value;
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Success! Welcome back!");
            window.alert("Success! Welcome back!");
            window.location.href = "https://hearmesee.netlify.app/";
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Wrong Email or Password. Try again.");
            window.alert("Wrong Email or Password. Try again.");
        });
});


  signupButton.addEventListener("click", function() {
      main.style.display = "none";
      createacct.style.display = "block";
  });
  
  returnBtn.addEventListener("click", function() {
      main.style.display = "block";
      createacct.style.display = "none";
  });

 

