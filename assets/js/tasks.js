const modal = document.getElementById("modal");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const deadLineInput = document.getElementById("deadLine");
const idInput = document.getElementById("idInput");

const todoColumnBody = document.querySelector("#todoColumn .body");

const creationModeTitle = document.getElementById("creationModeTitle");
const editingModeTitle = document.getElementById("editingModeTitle");
const creationModeBtn = document.getElementById("creationModeBtn");
const editingModeBtn = document.getElementById("editingModeBtn");
const deleteModeBtn = document.getElementById('deleteModeBtn');


let todoList = [];

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    generateCards();
  }
});



function openModal(id) {
  modal.style.display = "flex";

  if (id) {
    creationModeTitle.style.display = "none";
    creationModeBtn.style.display = "none";

    editingModeTitle.style.display = "block";
    editingModeBtn.style.display = "block";
    deleteModeBtn.style.display = 'block';

    const index = todoList.findIndex(function (task) {
      return task.id == id;
    });

    const task = todoList[index];
    idInput.value = task.id;
    descriptionInput.value = task.description;
    priorityInput.value = task.priority;
    deadLineInput.value = task.deadline;
  } else {
    creationModeTitle.style.display = "block";
    creationModeBtn.style.display = "block";

    editingModeTitle.style.display = "none";
    editingModeBtn.style.display = "none";
    deleteModeBtn.style.display = 'none';
  }
}

function closeModal() {
  modal.style.display = "none";

  descriptionInput.value = "";
  priorityInput.value = "";
  deadLineInput.value = "";
}

function generateCards() {
  const todoListHtml = todoList.map(function (task) {
    const formattedDate = moment(task.deadline).format("DD/MM/YYYY");

    return `
    <div class='card' ondblclick='openModal(${task.id})'> 
        <div class='info '>
            <b>Descrição:</b>
            <p>${task.description}</p>
        </div>

        <div class='info'>
            <b>Prioridade:</b>
            <span>${task.priority}</span>
        </div>

        <div class='info'>
            <b>Prazo:</b>
            <span>${formattedDate}</span>
        </div>
    </div>
    `;
  });

  todoColumnBody.innerHTML = todoListHtml.join("");
}

function createTask() {
  const newTask = {
    id: Math.floor(Math.random() * 999),
    description: descriptionInput.value,
    priority: priorityInput.value,
    deadline: deadLineInput.value,
  };

  todoList.push(newTask);
  closeModal();
  generateCards();

  console.log(todoList);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function updateTask() {
  const task = {
    id: idInput.value,
    description: descriptionInput.value,
    priority: priorityInput.value,
    deadline: deadLineInput.value,
  };

  const index = todoList.findIndex(function (task) {
    return task.id == idInput.value;
  });

  todoList[index] = task;
  closeModal();
  generateCards();
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteTask() {
  const taskId = idInput.value;

  const index = todoList.findIndex(function (task) {
    return task.id == taskId;
  });

  if (index > -1) {
    todoList.splice(index, 1);
    closeModal();
    generateCards();

    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
}
