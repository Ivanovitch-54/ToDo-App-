import { filterTasks } from "./filter.js";

export function renderTasks(tasks, currentFilter) {
  const list = document.querySelector("#taskList");

  let filteredTasks = filterTasks(tasks, currentFilter);

  // Vide la liste avant de start //
  list.innerHTML = "";

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item", "task-enter");
    li.setAttribute("draggable", true);

    if (task.completed) {
      li.classList.add("completed");
    }
    li.dataset.id = task.id;

    li.innerHTML = `
    <label class="task-checkbox">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="checkmark"></span>
    </label>

    <span class="task-text">
        ${task.text}
    </span>

    <button class="delete-btn">✕</button>
`;

    list.appendChild(li);
  });
}
