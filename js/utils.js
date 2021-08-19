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
  if (user.emailVerified) {
    emailVerified.innerHTML = "E-mail verificado";
    hiddenItem(sendEmailVerificationDiv);
  } else {
    emailVerified.innerHTML = "E-mail não verificado";
    showItem(sendEmailVerificationDiv);
  }

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

let actionCodeSettings = {
  url: "http://127.0.0.1:5500/",
};
