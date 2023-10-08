window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listEl = document.querySelector("#tasks");
    let tasks = [];

    // Load tasks from local storage, if available
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            const taskEl = createTaskElement(task);
            listEl.appendChild(taskEl);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        if (task !== '') {
            tasks.push(task);

            const taskEl = createTaskElement(task);
            listEl.appendChild(taskEl);

            input.value = '';

            // Save tasks to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    function createTaskElement(task) {
        const taskEl = document.createElement('li');
        taskEl.classList.add('task');

        const taskTextEl = document.createElement('span');
        taskTextEl.textContent = task;

        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('delete');
        taskDeleteBtn.textContent = 'Delete';

        taskDeleteBtn.addEventListener('click', () => {
            // Remove the task from the array
            const taskIndex = tasks.indexOf(task);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);

                // Remove the task from the list
                listEl.removeChild(taskEl);

                // Save updated tasks to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        taskEl.appendChild(taskTextEl);
        taskEl.appendChild(taskDeleteBtn);

        return taskEl;
    }
});
