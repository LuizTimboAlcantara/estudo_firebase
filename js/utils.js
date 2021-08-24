let authForm = document.getElementById("authForm");
let authFormTitle = document.getElementById("authFormTitle");
let register = document.getElementById("register");
let access = document.getElementById("access");
let loading = document.getElementById("loading");
let auth = document.getElementById("auth");
let userContent = document.getElementById("userContent");
let userEmail = document.getElementById("userEmail");
let emailVerified = document.getElementById("emailVerified");
let sendEmailVerificationDiv = document.getElementById("sendEmailVerificationDiv");
let passwordReset = document.getElementById("passwordReset");
let userImg = document.getElementById("userImg");
let userName = document.getElementById("userName");

function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = "Cadastrar conta";
  authFormTitle.innerHTML = "Insira seus dados para se cadastrar";

  hiddenItem(register);
  hiddenItem(passwordReset);
  showItem(access);
}

function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = "Acessar";
  authFormTitle.innerHTML = "Acesse  a sua conta para continuar";

  hiddenItem(access);
  showItem(passwordReset);
  showItem(register);
}

function hiddenItem(element) {
  element.style.display = "none";
}

function showItem(element) {
  element.style.display = "block";
}

function showUserContent(user) {
  if (user.providerData[0].id != "password") {
    emailVerified.innerHTML =
      "Autentição por provedor confiável, não é necessário verificar e-mail";
    hiddenItem(sendEmailVerificationDiv);
  } else {
    if (user.emailVerified) {
      emailVerified.innerHTML = "E-mail verificado";
      hiddenItem(sendEmailVerificationDiv);
    } else {
      emailVerified.innerHTML = "E-mail não verificado";
      showItem(sendEmailVerificationDiv);
    }
  }

  userImg.src = user.photoURL ? user.photoURL : "img/unknownUser.png";
  userName.innerHTML = user.displayName;

  userEmail.innerHTML = user.email;
  hiddenItem(auth);
  showItem(userContent);
}

function showAuth() {
  authForm.email.value = "";
  authForm.password.value = "";
  hiddenItem(userContent);
  showItem(auth);
}

function showError(prefix, error) {
  console.log(error.code);
  hiddenItem(loading);

  switch (error.code) {
    case "auth/invalid-email":
    case "auth/wrong-password":
      alert(`${prefix} E-mail ou senha inválidos.`);
      break;

    case "auth/weak-password":
      alert(`${prefix} A senha deve possuir no mínimo 6 caracteres.`);
      break;

    case "auth/email-already-in-use":
      alert(`${prefix} E-mail já existe.`);
      break;

    case "auth/popup-closed-by-user":
      alert(
        `${prefix} O popup de autenticação foi fechado antes da operação ser concluída.`
      );
      break;

    default:
      alert(`${prefix} ${error.message}`);
      break;
  }
}

let actionCodeSettings = {
  url: "http://127.0.0.1:5500/",
};
