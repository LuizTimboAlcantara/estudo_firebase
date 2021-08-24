firebase.auth().languageCode = "pt-BR";

authForm.onsubmit = function (event) {
  showItem(loading);

  event.preventDefault();
  if (authForm.submitAuthForm.innerHTML == "Acessar") {
    firebase
      .auth()
      .signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch(function (error) {
        showError("Falha no acesso: ", error);
        hideItem(loading);
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch(function (error) {
        showError("Falha no cadastro: ", error);
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
      showError("Falha ao sair: ", error);
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
    showError("Houve um erro ao enviar o e-mail de verificação: ", error);
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
      showError("Houve um erro ao enviar e-mail de redefinição de senha!", error);
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
    showError("Erro ao tentar autenticar com o Google.", error);
    hiddenItem(loading);
  }
}

function signInWithGitHub() {
  showItem(loading);
  try {
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
  } catch (error) {
    showError("Erro ao tentar autenticar com o GitHub.", error);
    hiddenItem(loading);
  }
}

function signInWithFacebook() {
  showItem(loading);
  try {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
  } catch (error) {
    showError("Erro ao tentar autenticar com o Facebook.", error);
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
    showError("Falha na atualização do usuário.", error);
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
      showError("Erro ao remover a conta.", error);
    } finally {
      hiddenItem(loading);
    }
  }
}
