// Get references to DOM elements
const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearButton = document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Add event listener for the Add button
addButton.addEventListener("click", addTask);

// Add event listener for the "Enter" key press in the input field
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <input type="checkbox" class="check">
      <span>${taskText}</span>
      <button class="delete">Delete</button>
    `;
    taskList.appendChild(listItem);
    taskInput.value = ""; // Clear the input field

    // Add event listener for the checkbox
    const checkbox = listItem.querySelector(".check");
    checkbox.addEventListener("change", function() {
      listItem.classList.toggle("completed", checkbox.checked);
      updateTaskCount();
    });

    // Add event listener for the delete button
    const deleteButton = listItem.querySelector(".delete");
    deleteButton.addEventListener("click", function() {
      taskList.removeChild(listItem);
      updateTaskCount();
    });

    updateTaskCount();
  }
}

// Function to update task count
function updateTaskCount() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".check:checked").length;
  taskCount.textContent = `${completedTasks} Task Completed Out of ${totalTasks}`;
}

// Add event listener for the Complete All button
completeAllButton.addEventListener("click", function() {
  const checkboxes = taskList.querySelectorAll(".check");
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = true;
    const listItem = checkbox.parentElement;
    listItem.classList.add("completed");
  });
  updateTaskCount();
});

// Add event listener for the Clear button
clearButton.addEventListener("click", function() {
  taskList.innerHTML = "";
  updateTaskCount();
});
