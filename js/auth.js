firebase.auth().languageCode = "pt-BR";

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
    await user.sendEmailVerification(actionCodeSettings);

    alert(
      `E-mail de verificação foi enviado para ${user.email}! Verifique a sua caixa de entrada`
    );
  } catch (error) {
    alert("Houve um erro ao enviar o e-mail de verificação");
    console.log(error);
  } finally {
    hiddenItem(loading);
  }
}

function sendPasswordResetEmail() {
  let email = prompt(
    "Redefinir senha! Informe o seu endereço de e-mail.",
    authForm.email.value
  );

  if (email) {
    showItem(loading);

    try {
      firebase.auth().sendPasswordResetEmail(email, actionCodeSettings);

      alert(`E-mail de redefinição de senha foi enviado para ${email}`);
    } catch (error) {
      alert("Houve um erro ao enviar e-mail de redefinição de senha!");
      console.log("🚀 ~ file: auth.js ~ line 74 ~ sendPasswordResetEmail ~ error", error);
    } finally {
      hiddenItem(loading);
    }
  } else {
    alert("É preciso preencher o campo de e-mail para redefinir a senha!");
  }
}

function signInWithGoogle() {
  showItem(loading);
  try {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } catch (error) {
    alert("Erro ao tentar autenticar com o Google");
    console.log("🚀 ~ file: auth.js ~ line 89 ~ signInWithGoogle ~ error", error);
    hiddenItem(loading);
  }
}

function signInWithGitHub() {
  showItem(loading);
  try {
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
  } catch (error) {
    alert("Erro ao tentar autenticar com o GitHub");
    console.log("🚀 ~ file: auth.js ~ line 105 ~ signInWithGitHub ~ error", error);
    hiddenItem(loading);
  }
}

function signInWithFacebook() {
  showItem(loading);
  try {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
  } catch (error) {
    alert("Erro ao tentar autenticar com o Facebook");
    console.log("🚀 ~ file: auth.js ~ line 116 ~ signInWithFacebook ~ error", error);
    hiddenItem(loading);
  }
}

function updateUserName() {
  let newUserName = prompt("Informe um novo nome de usuário.", userName.innerHTML);

  if (newUserName && newUserName != "") {
    userName.innerHTML = newUserName;
  } else {
    alert("O nome não pode ser vazio");
  }

  showItem(loading);
  try {
    firebase.auth().currentUser.updateProfile({
      displayName: newUserName,
    });
  } catch (error) {
    alert("Erro ao tentar autenticar com o GitHub");
    console.log("🚀 ~ file: auth.js ~ line 134 ~ updateUserName ~ error", error);
  } finally {
    hiddenItem(loading);
  }
}

function deleteUserAccount() {
  let confirmation = confirm("Relamente deseja excluir a sua conta?");

  if (confirmation) {
    showItem(loading);

    try {
      if (firebase.auth().currentUser.delete()) {
        alert("Conta foi removida com sucesso");
      }
    } catch (error) {
      alert("Erro ao remover a conta");
      console.log("🚀 ~ file: auth.js ~ line 153 ~ deleteUserAccount ~ error", error);
    } finally {
      hiddenItem(loading);
    }
  }
}
