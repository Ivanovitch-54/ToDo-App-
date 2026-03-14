let tasks = [];
let currentFilter = "all";

const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskCount = document.querySelector("#taskCount");
const filters = document.querySelector(".filters");
const clearBtn = document.querySelector("#clearCompleted");

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
const taskList = document.querySelector("#taskList");
taskList.addEventListener("click", handleTaskClick);
filters.addEventListener("click", handleFilterClick);
clearBtn.addEventListener("click", clearCompleted);

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
  updateTaskCount();

  input.value = "";

  console.log("Task added great succes");
}

function handleTaskClick(e) {
  const element = e.target;

  // DELETE TASK
  if (element.classList.contains("delete-btn")) {
    const li = element.closest("li");
    const id = Number(li.dataset.id);

    tasks = tasks.filter((task) => task.id !== id);

    renderTasks(tasks);
    updateTaskCount();
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
    updateTaskCount();
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
function clearCompleted(){

  tasks = tasks.filter(task => !task.completed);

  renderTasks(tasks);
  updateTaskCount();

}
