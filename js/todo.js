todoForm.onsubmit = function (event) {
  event.preventDefault();

  if (todoForm.name.value !== "") {
    let data = { name: todoForm.name.value };

    try {
      dbRefUsers.child(firebase.auth().currentUser.uid).push(data);

      console.log(`Tarefa ${data.name} adicionada com sucesso!`);
    } catch (error) {
      console.log("🚀 ~ file: todo.js ~ line 12 ~ error", error);
    }
  } else {
    alert("O nome da tarefa não pode ser vazia!");
  }
};
