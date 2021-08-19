let authForm = document.getElementById("authForm");
let authFormTitle = document.getElementById("authFormTitle");
let register = document.getElementById("register");
let access = document.getElementById("access");
let loading = document.getElementById("loading");
let auth = document.getElementById("auth");
let userContent = document.getElementById("userContent");
let userEmail = document.getElementById("userEmail");

function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = "Cadastrar conta";
  authFormTitle.innerHTML = "Insira seus dados para se cadastrar";

  hiddenItem(register);
  showItem(access);
}

function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = "Acessar";
  authFormTitle.innerHTML = "Acesse  a sua conta para continuar";

  hiddenItem(access);
  showItem(register);
}

function hiddenItem(element) {
  element.style.display = "none";
}

function showItem(element) {
  element.style.display = "block";
}

function showUserContent(user) {
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
