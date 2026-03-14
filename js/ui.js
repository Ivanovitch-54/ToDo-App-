function renderTasks(tasks) {
  const list = document.querySelector("#taskList");
  // Filtre les tâches
  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  // Vide la liste avant de start //
  list.innerHTML = "";

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item", "task-enter");

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
