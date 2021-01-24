// Get the button new
let newTaskButton = document.querySelector("#new_task_button");
let fields = document.querySelectorAll("input[required], textarea[required]");

fields.forEach((field) => {
  field.addEventListener(
    "focus",
    () => {
      resetField(field);
    },
    false
  );
  field.addEventListener(
    "blur",
    () => {
      if (validateField(field)) {
        if (field.type == "date") {
          validateDate(field);
        }
      }
    },
    false
  );
});
// Cretate the event when the button new is clicked
newTaskButton.addEventListener(
  "click",
  (e) => {
    // Get the form for creating a new task
    let newTaskForm = document.querySelector("#new_task");

    // Toggle the class hide to the newTaskForm
    newTaskForm.classList.toggle("hide");
  },
  false
);

// Get the new task form
let taskForm = document.querySelector("#new_task_form");

// Event : Submit new task form
taskForm.addEventListener(
  "submit",
  (e) => {
    // prevent default behaviour of the form
    e.preventDefault();

    // Reset error message for each field of the form
    fields.forEach((field) => {
      resetField(field);
    });

    // Default value
    let valid = true;

    // Check if each field is valid
    fields.forEach((field) => {
      if (!validateField(field)) {
        valid = false;
      }

      // Check if the field is a date
      if (field.type == "date") {
        if (!validateDate(field)) {
          valid = false;
        }
      }
    });

    // if valid submit
    if (valid) {
      //e.target.submit();
    }
  },
  false
);

//Function that check the validity of the date
function validateDate(field) {
  let now = Date.now();
  let deadline = field.value;

  // Check if the date entred is in the past
  if (deadline > now) {
    return true;
  } else {
    // Add "invalid" class for the invalid field entry
    field.classList.add("invalid");
    field.previousElementSibling.insertAdjacentHTML(
      "beforeend",
      '<span class="msg">Please enter a valid date</span>'
    );
    return false;
  }
}

// Function that check if a field entry is valid
function validateField(field) {
  if (field.checkValidity()) {
    return true;
  } else {
    // Add "invalid" class for the invalid field entry
    field.classList.add("invalid");
    field.previousElementSibling.insertAdjacentHTML(
      "beforeend",
      `<span class="msg">${field.validationMessage}</span>`
    );
    return false;
  }
}

// Function that remove the previous invalid entry
function resetField(field) {
  let fieldLabel = field.previousElementSibling;
  field.classList.remove("invalid");

  while (fieldLabel.firstElementChild) {
    fieldLabel.removeChild(fieldLabel.firstElementChild);
  }

  field.valid = true;
}

/* let task = {
  "name":,
  "deadline":,
  "description":,
} */
