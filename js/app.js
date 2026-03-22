import { saveTasks, loadTasks } from "./storage.js";
import { handleDragStart, handleDragOver, handleDrop } from "./dragdrop.js";
import { renderTasks } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  let tasks = loadTasks();
  let currentFilter = "all";

  const input = document.querySelector("#taskInput");
  const addBtn = document.querySelector("#addBtn");
  const taskCount = document.querySelector("#taskCount");
  const filters = document.querySelector(".filters");
  const clearBtn = document.querySelector("#clearCompleted");
  const emptyState = document.querySelector("#emptyState");
  const themeToggle = document.querySelector("#themeToggle");
  const taskList = document.querySelector("#taskList");

  renderTasks(tasks, currentFilter);
  updateTaskCount();
  updateEmptyState();

  addBtn.addEventListener("click", addTask);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  taskList.addEventListener("click", handleTaskClick);
  filters.addEventListener("click", handleFilterClick);
  clearBtn.addEventListener("click", clearCompleted);

  taskList.addEventListener("dragstart", handleDragStart);
  taskList.addEventListener("dragover", handleDragOver);

  taskList.addEventListener("drop", (e) => {
    tasks = handleDrop(e, tasks);
    saveTasks(tasks);
    renderTasks(tasks, currentFilter);
  });

  taskList.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });

  taskList.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  themeToggle.addEventListener("click", toggleTheme);

  function addTask() {
    const text = input.value.trim();
    if (!text) return;

    const task = {
      id: Date.now(),
      text,
      completed: false,
    };

    tasks.push(task);

    saveTasks(tasks);

    renderTasks(tasks, currentFilter);
    updateTaskCount();
    updateEmptyState();

    input.value = "";
  }

  function handleTaskClick(e) {
    const element = e.target;

    if (element.classList.contains("delete-btn")) {
      const li = element.closest("li");
      const id = Number(li.dataset.id);

      tasks = tasks.filter((task) => task.id !== id);

      saveTasks(tasks);
      renderTasks(tasks, currentFilter);
      updateTaskCount();
      updateEmptyState();
    }

    if (element.matches("input[type='checkbox']")) {
      const li = element.closest("li");
      const id = Number(li.dataset.id);

      tasks = tasks.map((task) => {
        if (task.id === id) {
          task.completed = element.checked;
        }
        return task;
      });

      saveTasks(tasks);
      renderTasks(tasks, currentFilter);
      updateTaskCount();
      updateEmptyState();
    }
  }

  function handleFilterClick(e) {
    const button = e.target;
    if (!button.dataset.filter) return;

    currentFilter = button.dataset.filter;

    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    renderTasks(tasks, currentFilter);
  }

  function clearCompleted() {
    tasks = tasks.filter((task) => !task.completed);

    saveTasks(tasks);
    renderTasks(tasks, currentFilter);
    updateTaskCount();
    updateEmptyState();
  }

  function updateTaskCount() {
    const active = tasks.filter((t) => !t.completed).length;

    taskCount.textContent =
      active === 1 ? "1 task left" : `${active} tasks left`;
  }

  function updateEmptyState() {
    emptyState.style.display = tasks.length === 0 ? "block" : "none";
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");
  }
});
