const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

todoForm.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        addTaskToDOM(task);
        todoInput.value = "";
    }
}

function addTaskToDOM(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    listItem.dataset.id = task.id;

    listItem.innerHTML = `<input type="checkbox" class="complete-checkbox"> <span>${task.text}</span> <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;

    todoList.append(listItem);
}
