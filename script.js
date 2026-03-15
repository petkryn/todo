"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const addTodoContainer = document.querySelector(".todo_add-container");
  const todoAddInput = document.querySelector(".todo_add-input");
  const todoParent = document.querySelector(".todo_container");
  const todoDate = document.querySelector(".todo_add-date");
  const modal = document.querySelector(".modal");
  const modalInput = document.querySelector(".modal-input");
  const modalDate = document.querySelector(".modal-date");
  const saveBtn = document.querySelector(".save-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  let editIndex = null;

  const todosDB = [];

  addTodoContainer.addEventListener("click", (event) => {
    const e = event.target;
    if (e.classList.contains("todo_add-btn") && todoAddInput.value.trim()) {
      todosDB.push({ text: todoAddInput.value, deadline: todoDate.value });
      todoAddInput.value = "";
      todoDate.value = "";
      todoRender();
    }
  });

  todoParent.addEventListener("click", (e) => {
    const event = e.target;
    if (event.closest(".delete-btn")) {
      const i = +event.closest(".delete-btn").dataset.delete;
      deleteTodo(i, todosDB, todoRender);
    }

    if (event.closest(".edit-btn")) {
      editIndex = +event.closest(".edit-btn").dataset.edit;

      modal.classList.remove("hidden");

      modalInput.value = todosDB[editIndex].text;
      modalDate.value = todosDB[editIndex].deadline;
    }
  });

  function deleteTodo(i, arr, cback) {
    arr.splice(i, 1);
    cback();
  }

  saveBtn.addEventListener("click", () => {
    if (editIndex !== null) {
      todosDB[editIndex].text = modalInput.value;
      todosDB[editIndex].deadline = modalDate.value;

      todoRender();
      modal.classList.add("hidden");
    }
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  function todoRender() {
    todoParent.innerHTML = "";
    todosDB.forEach((todo, index) => {
      const deadline = new Date(todo.deadline);
      const now = new Date();
      const time = deadline - now;
      const days = Math.ceil(time / (1000 * 60 * 60 * 24));
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoDiv.innerHTML = `
        
            <h2>${todo.text}</h2>
            <p>${days}days left</p>
            <div class="buttons">
              <button class="delete-btn" title="Delete" data-delete="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                  <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                </svg>
              </button>
              <button class="edit-btn" title="Edit" data-edit="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                </svg>
              </button>
            </div>
            
        `;
      todoParent.appendChild(todoDiv);
    });
  }
});
