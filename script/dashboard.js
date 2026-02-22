const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
}
document.getElementById("welcome").innerText =
  "Welcome, " + currentUser.email;

let todos = JSON.parse(localStorage.getItem("todos")) || [];

document.getElementById("createTodoBtn").addEventListener("click", function () {

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title === "" || description === "") {
    alert("Title and Description cannot be empty!");
    return;
  }

  const newTodo = {
    id: Date.now().toString(),
    title: title,
    description: description,
    isCompleted: false,
    userId: currentUser.id
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  renderTodos();
});

function renderTodos() {

  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const userTodos = todos.filter(function (todo) {
    return todo.userId === currentUser.id;
  });

  userTodos.forEach(function (todo) {

    const div = document.createElement("div");
    div.style.border = "1px solid black";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <h4>${todo.title}</h4>
      <p>${todo.description}</p>
      <p>Status: ${todo.isCompleted ? "Completed" : "Pending"}</p>
      <input type="checkbox" ${todo.isCompleted ? "checked" : ""} 
        onchange="toggleTodo('${todo.id}')">
      <button onclick="deleteTodo('${todo.id}')">Delete</button>
    `;

    todoList.appendChild(div);
  });
}

function toggleTodo(id) {

  const index = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (index !== -1) {
    todos[index].isCompleted = !todos[index].isCompleted;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

function deleteTodo(id) {

  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}


renderTodos();