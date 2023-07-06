const userContainer = document.getElementById('task-list');

const getUsers = async () => {
  try {
    const response = await fetch('https://dummyjson.com/todos?limit=12');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.log(error);
  }
};

const displayUsers = async () => {
  const users = await getUsers();
  console.log(users);
  if (Array.isArray(users)) {
    users.forEach(item => {
      let li = document.createElement('li');
      let checkbox = document.createElement('input');
      let label = document.createElement('label');
      let deleteButton = document.createElement('button');

      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.padding = '10px';
      li.style.border = '1px solid #ccc';
      li.style.marginBottom = '10px';

      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      checkbox.style.marginRight = '10px';

      label.textContent = item.todo;

      deleteButton.textContent = '-';
      deleteButton.classList.add('delete-button');

      deleteButton.addEventListener('click', () => {
        deleteTask(item.id);
        li.remove();
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(deleteButton);
      userContainer.appendChild(li);
    });
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.log(error);
  }
};

displayUsers();

const addNewTask = () => {
  const taskInput = document.getElementById('new-task');
  const newTask = taskInput.value.trim();
  taskInput.value = '';
  if (newTask) {
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let deleteButton = document.createElement('button');

    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.padding = '10px';
    li.style.border = '1px solid #ccc';
    li.style.marginBottom = '10px';

    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px';

    label.textContent = newTask;

    deleteButton.textContent = '-';
    deleteButton.classList.add('delete-button');

    deleteButton.addEventListener('click', () => {
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);
    userContainer.appendChild(li);
  }
};

const clearCompletedTasks = () => {
  const completedTasks = userContainer.querySelectorAll('li');
  completedTasks.forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      task.remove();
    }
  });
};