let draggedTaskId = null;

export function handleDragStart(e){
    const li = e.target.closest(".task-item");

    if(!li) return;

    draggedTaskId = Number(li.dataset.id);
}

export function handleDragOver(e){
    e.preventDefault();
}

export function handleDrop(e, tasks){
    const li = e.target.closest(".task-item");

    if(!li) return tasks;

    const targetId = Number(li.dataset.id);

    if(targetId === draggedTaskId) return tasks;

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const targetIndex = tasks.findIndex(t => t.id === targetId);

    const draggedTask = tasks.splice(draggedIndex,1)[0];

    tasks.splice(targetIndex,0,draggedTask);

    return tasks;
}