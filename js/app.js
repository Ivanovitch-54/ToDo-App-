let tasks = [];
let currentFilter = "all";

const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskCount = document.querySelector("#taskCount");
const filters = document.querySelector(".filters");
const clearBtn = document.querySelector("#clearCompleted");
const emptyState = document.querySelector("#emptyState");
const themeToggle = document.querySelector("#themeToggle");

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
const taskList = document.querySelector("#taskList");
taskList.addEventListener("click", handleTaskClick);
filters.addEventListener("click", handleFilterClick);
clearBtn.addEventListener("click", clearCompleted);
input.addEventListener("input", () => {
  addBtn.disabled = input.value.trim() === "";
});
themeToggle.addEventListener("click", toggleTheme);

function addTask() {
  const text = input.value.trim();

  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);

  renderTasks(tasks);
  updateEmptyState();
  updateTaskCount();
  saveTasks();

  input.value = "";
  addBtn.disabled = true;

  console.log("Task added great succes");
}

function handleTaskClick(e) {
  const element = e.target;

  // DELETE TASK
  if (element.classList.contains("delete-btn")) {
    const li = element.closest("li");
    const id = Number(li.dataset.id);

    li.classList.add("removing");

    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== id);

      renderTasks(tasks);
      updateEmptyState();
      updateTaskCount();
      saveTasks();
    }, 250);
  }

  // TOGGLE COMPLETED
  if (element.matches("input[type='checkbox']")) {
    const li = element.closest("li");
    const id = Number(li.dataset.id);

    tasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = element.checked;
      }

      return task;
    });

    renderTasks(tasks);
    updateEmptyState();
    updateTaskCount();
    saveTasks();
  }
}

function updateTaskCount() {
  const activeTasks = tasks.filter((task) => !task.completed);

  const count = activeTasks.length;

  taskCount.textContent = count === 1 ? "1 task left" : `${count} tasks left`;
}

function handleFilterClick(e) {
  const button = e.target;

  if (!button.dataset.filter) return;

  currentFilter = button.dataset.filter;

  // retirer la classe active sur tous les boutons
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // ajouter la classe sur le bouton cliqué
  button.classList.add("active");

  renderTasks(tasks);
}

// Supprimer les tasks
function clearCompleted() {
  const completed = document.querySelectorAll(".task-item.completed");

  completed.forEach((task) => task.classList.add("removing"));

  setTimeout(() => {
    tasks = tasks.filter((task) => !task.completed);

    renderTasks(tasks);
    updateEmptyState();
    updateTaskCount();
    saveTasks();
  }, 250);
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    renderTasks(tasks);
    updateTaskCount();
    updateEmptyState();
  }
}

function updateEmptyState() {
  if (tasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

input.focus();

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Charger la tâche
loadTasks();

// Charger le theme Dark ou Light
loadTheme();

function loadTheme(){

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark");
    }

}