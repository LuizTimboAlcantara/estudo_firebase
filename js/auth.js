authForm.onsubmit = async function (event) {
  event.preventDefault();

  if (authForm.submitAuthForm.innerHTML == "Acessar") {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
};
