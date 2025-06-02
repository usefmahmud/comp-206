const URL = "http://localhost:3000";

function renderLogin(isLoggedin) {
  const loginElement = document.getElementById("login");
  if (isLoggedin) {
    loginElement.innerHTML = `<button id="logout-btn">logout</button>`;
    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", () => {
      fetch(`${URL}/users`, {
        method: "DELETE",
      }).then(() => {
        renderApp();
      });
    });
  } else {
    loginElement.innerHTML = `<input type="text" id="name" />
            <button id="create-btn">create</button>`;
    const userNameElement = document.getElementById("name");
    const createBtn = document.getElementById("create-btn");

    createBtn.addEventListener("click", (event) => {
      const name = userNameElement.value;
      fetch(`${URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          renderApp();
        }); // [resolved, rejected] - pending
    });
  }
}

function renderTodos(isLoggedin) {
  const list = document.getElementById("list");
  if (isLoggedin) {
    fetch(`${URL}/todos`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.todos.length === 0) {
          list.innerHTML = "<p>todos are empty</p>";
        } else {
          list.innerHTML = "";
          data.todos.forEach((todo) => {
            const li = document.createElement("li");
            li.innerHTML = todo.content;

            const delButton = document.createElement("button");
            delButton.innerHTML = "delete";
            delButton.addEventListener("click", () => {
              deleteTodo(todo.id, isLoggedin);
            });

            li.appendChild(delButton);

            list.appendChild(li);
          });
        }
      });
  } else {
    list.innerHTML = "<p>you should login first</p>";
  }
}

function addTodo(isLoggedin) {
  const ele = document.getElementById("todo-input");
  ele.innerHTML = `<input type="text" id="todo" />
      <button id="todo-btn">add</button>`;

  const input = document.getElementById("todo");
  const btn = document.getElementById("todo-btn");

  btn.addEventListener("click", () => {
    const inputValue = input.value;
    fetch(`${URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: inputValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          renderTodos(isLoggedin);
        }
      });
  });
}

function deleteTodo(todoId, isLoggedin) {
  fetch(`${URL}/todos/${todoId}`, {
    method: "DELETE",
  }).then(() => renderTodos(isLoggedin));
}

function renderApp() {
  // true
  fetch("/users/status")
    .then((res) => res.json())
    .then((data) => {
      renderLogin(data.loggedin);
      renderTodos(data.loggedin);
      addTodo(data.loggedin);
    });
}

renderApp();
