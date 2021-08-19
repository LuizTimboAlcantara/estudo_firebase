authForm.onsubmit = function (event) {
  showItem(loading);

  event.preventDefault();
  if (authForm.submitAuthForm.innerHTML == "Acessar") {
    firebase
      .auth()
      .signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch(function (error) {
        console.log("Falha no acesso");
        console.log(error);
        hideItem(loading);
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch(function (error) {
        console.log("Falha no cadastro");
        console.log(error);
        hideItem(loading);
      });
  }
};

firebase.auth().onAuthStateChanged(function (user) {
  hiddenItem(loading);
  if (user) {
    showUserContent(user);
  } else {
    showAuth();
  }
});

function signOut() {
  firebase
    .auth()
    .signOut()
    .catch(function (error) {
      console.log("Falha ao sair");
      console.log(error);
    });
}

async function sendEmailVerification() {
  let user = firebase.auth().currentUser;
  showItem(loading);

  try {
    await user.sendEmailVerification();

    alert(`E-mail de verificação foi enviado para ${user.email}! Verifique a sua caixa de entrada`);
  } catch (error) {
    alert("Houve um erro ao enviar o e-mail de verificação");
    console.log(error);
  } finally {
    hiddenItem(loading);
  }
}
