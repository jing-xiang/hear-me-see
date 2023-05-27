import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = initializeApp( {
    apiKey: "AIzaSyAeAl3FUH0PGDWToUzSqhKfj4af-RR-8ok",
    authDomain: "hear-me-see.firebaseapp.com",
    databaseURL: "https://hear-me-see-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hear-me-see",
    storageBucket: "hear-me-see.appspot.com",
    messagingSenderId: "28925318865",
    appId: "1:28925318865:web:77ec8aa82bf8c877a1d7f0",
    measurementId: "G-WN6MKN9KBQ"
});

const app = initializeApp(firebaseConfig);\
const database = getDatabase(app);

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function register() {
    var username = getInputVal('username');
    var email = getInputVal('email');
    var password = getInputVal('password');

    if (validate_email(email) == false || validate_password(password) == false ) {
        alert('Please ensure your password has more than 6 characters')
        return
    }

    auth.createUserWithEmailAndPasword(email, password) 
        .then(function() {

            var user = auth.currentUser

            var database_ref = database.ref()

            var user_data = {
                username: username,
                email: email,
                last_login: Date.now()
            }

            database_ref.child('users/' + user.uid).set(user.data)

            alert('User Created!')

        })
        .catch(function(error) {
            var error_code = error.error_code
            var error_mesage = error.message

            alert(error_mesage)
        })
    }

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field==null) {
        return false
    }
    
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}