function showCaretakerSignIn() {
    document.getElementById("first-page").style.display = "none";
    document.getElementById("caretaker-signin").style.display = "block";
  }
  
  function showUserSignUp() {
    document.getElementById("first-page").style.display = "none";
    document.getElementById("user-signup").style.display = "block";
  }
  
  function submitCaretakerSignIn() {
    // Handle caretaker sign in here
    // You can retrieve the email value and perform any necessary validation
    // For example: const email = document.querySelector("#caretaker-signin input[type=email]").value;
    // Once signed in, you can redirect or perform other actions as needed
  }
  
  function submitUserSignUp() {
    // Handle user sign up here
    // You can retrieve the input values (name, email, password) and perform any necessary validation
    // For example:
    // const name = document.querySelector("#user-signup input:nth-child(1)").value;
    // const email = document.querySelector("#user-signup input:nth-child(2)").value;
    // const password = document.querySelector("#user-signup input:nth-child(3)").value;
    // Once signed up, you can redirect or perform other actions as needed
  }
  