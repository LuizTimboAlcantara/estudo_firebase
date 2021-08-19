let authForm = document.getElementById("authForm");
let authFormTitle = document.getElementById("authFormTitle");
let register = document.getElementById("register");
let access = document.getElementById("access");

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
  element.style.display = "block";
}

function showItem(element) {
  element.style.display = "none";
}
