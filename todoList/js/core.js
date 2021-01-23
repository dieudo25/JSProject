// Get the button new
let newTaskButton = document.querySelector("#new_task");

// Cretate the event when the button new is clicked
newTaskButton.addEventListener("click", displayNewTaskForm, false);

function displayNewTaskForm(e) {
  // Get the form for creating a new task
  let newTaskForm = document.querySelector("#new_task_form");

  // Toggle the class hide to the newTaskForm
  newTaskForm.classList.toggle("hide");
}
