todoForm.onsubmit = function (event) {
  event.preventDefault();

  if (todoForm.name.value !== "") {
    let data = { name: todoForm.name.value };

    try {
      dbRefUsers.child(firebase.auth().currentUser.uid).push(data);

      console.log(`Tarefa ${data.name} adicionada com sucesso!`);
    } catch (error) {
      showError("Falha ai adicionar tarefa", error);
    }
  } else {
    alert("O nome da tarefa não pode ser vazia!");
  }
};

function fillTodoList(dataSnapshot) {
  ulTodoList.innerHTML = "";
  let count = dataSnapshot.numChildren();
  todoCount.innerHTML = count + (count + 1 ? " tarefas" : " tarefa") + ":";

  dataSnapshot.forEach(function (item) {
    let value = item.val();

    let li = document.createElement("li");
    let spanLi = document.createElement("span");

    spanLi.appendChild(document.createTextNode(value.name));
    li.appendChild(spanLi);
    ulTodoList.appendChild(li);
  });
}
