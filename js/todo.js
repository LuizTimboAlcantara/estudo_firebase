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

    todoForm.name.value = "";
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
    spanLi.id = item.key;
    li.appendChild(spanLi);

    let liRemoveBtn = document.createElement("button");
    liRemoveBtn.appendChild(document.createTextNode("Excluir"));
    liRemoveBtn.setAttribute("onclick", 'removeTodo("' + item.key + '")');
    liRemoveBtn.setAttribute("class", "danger todoBtn");
    li.appendChild(liRemoveBtn);

    let liUpdateBtn = document.createElement("button");
    liUpdateBtn.appendChild(document.createTextNode("Editar"));
    liUpdateBtn.setAttribute("onclick", 'updateTodo("' + item.key + '")');
    liUpdateBtn.setAttribute("class", "alternative todoBtn");
    li.appendChild(liUpdateBtn);

    ulTodoList.appendChild(li);
  });
}

function removeTodo(key) {
  let selectedItem = document.getElementById(key);
  let confirmation = confirm(
    `Realmente deseja remover a tarefa? "${selectedItem.innerHTML}"`
  );
  if (confirmation) {
    try {
      dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove();
    } catch (error) {
      showError("Falha ao remover a tarefa", error);
    }
  }
}

function updateTodo(key) {
  let selectedItem = document.getElementById(key);
  let newTodoName = prompt(
    `Escolha um novo nome para a tarefa ${selectedItem.innerHTML}`,
    selectedItem.innerHTML
  );

  if (newTodoName != "") {
    let data = { name: newTodoName };

    try {
      dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data);
      console.log(`Tarefa "${data.name}" atualizada com sucesso!`);
    } catch (error) {
      showError("Falha ao atualizar tarefa:", error);
    }
  } else {
    alert("Defina um nome para a tarefa!");
  }
}
