const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const date = document.querySelector("#date");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task);
  });
}

const today = new Date();

const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};

date.textContent = " it's " + today.toLocaleDateString("en-US", options);

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
    saveTasksToLocalStorge(task);
    todoInput.value = "";
  }
}

function addTaskToDOM(task) {
  const listItem = document.createElement("li");
  listItem.className = `todo-item ${task.completed ? "completed" : ""}`;
  listItem.dataset.id = task.id;

  listItem.innerHTML = `<div class="text-check"><input id="complete" type="checkbox" class="complete-checkbox" ${task.completed && "checked"}> <span class="taskText">${task.text}</span></div> <div class="btns"><button class="edit-btn"><i class="bi bi-pencil-square"></i></button> <button class="delete-btn"><i class="bi bi-trash3"></i></button</div>`;

  todoList.append(listItem);
  atachEventListener(listItem, task);
}

function saveTasksToLocalStorge(task) {
  const oldTasks = getTasksFromLocalStorage();
  oldTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

function getTasksFromLocalStorage() {
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  return oldTasks;
}

function atachEventListener(listItem, task) {
  const deleteBtn = listItem.querySelector(".delete-btn");
  const editBtn = listItem.querySelector(".edit-btn");
  const checkBox = listItem.querySelector(".complete-checkbox");



  checkBox.addEventListener("change", function () {
    handleTaskCompletetion(task.id, listItem, checkBox.checked)
    })

  editBtn.addEventListener("click", function () {
    handleEditTask(task.id, listItem)
  })



  deleteBtn.addEventListener("click", function () {
    hadleDeleteTask(task.id, listItem, checkBox.checked);
  });
}


    

function handleTaskCompletetion(id,li,isCompleted){
  let tasks = getTasksFromLocalStorage();

  const task = tasks.find(task => task.id == id)
  

  if(task){
    task.completed = isCompleted
    localStorage.setItem('tasks', JSON.stringify(tasks))
    li.classList.toggle('completed', isCompleted)
  }
}


function handleEditTask(id,li){
  const spanText = li.querySelector(".taskText");

  const newTaskText = prompt('edit Task', spanText.textContent)
  
  if(newTaskText  !== null && newTaskText.trim() !== ""){

    // update localStorage 
  updateTask(id,newTaskText)
    // update the dom 
    spanText.textContent = newTaskText
  }

}




function hadleDeleteTask(id, li) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}


function updateTask(id,newTaskText){
  const tasks = getTasksFromLocalStorage()
  const task = tasks.find(task => task.id === id)
  if(task){
    task.text = newTaskText
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
}