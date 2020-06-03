import "../scss/app.scss";

/*
 * VARIABLES
 */

// Form
const form = document.querySelector(".form");
// Input fields
const fields = form.querySelectorAll(".form__input");
// Convert 'fields' nodelist to array
const fieldsArr = Array.from(fields);
// Menu
const menuBtn = document.querySelector(".menu");


/*
 * FUNCTIONS
 */

/*
 * NAME: patternError
 * DESCRIPTION: Checks if field matches the pattern specified in the HTML attribute 'pattern'
 * PARAMETERS:
 *   1. id: id of field
 *   2. msg: error message to display
 */
const patternError = (id, msg) => {
  // Set content of error - applies to firstName, lastName and phone fields
  if (id === "firstName" || id === "lastName") {
    msg.setAttribute("data-after", "Field only allows letters");
  } else if (id === "phone") {
    msg.setAttribute(
      "data-after",
      "Phone should contain country code and phone number"
    );
  }
};

/*
 * NAME: typeError
 * DESCRIPTION: Checks if field matches the 'type' input field - only applies for email input
 * PARAMETERS:
 *   1. msg: error message to display
 */
const typeError = (msg) => msg.setAttribute("data-after", "Please, enter a valid email address");

/*
 * NAME: displayError
 * DESCRIPTION: Displays appropriate error according to validity check (pattern or type)
 * PARAMETERS:
 *   1. id: input field ID
 */
const displayError = (id) => {
  // Select error element sibling of input field
  const error = document.querySelector(`#${id} ~ .error`);

  // Add error class
  error.classList.add("is-error");

  // Check for pattern error
  if (id === "firstName" || id === "lastName" || id === "phone") {
    patternError(id, error);
  }

  // Check for type error
  if (id === "email") {
    typeError(error);
  }
};

/*
 * NAME: hideError
 * DESCRIPTION: Hides error message
 * PARAMETERS:
 *   1. id: input field ID
 */
const hideError = (id) => {
  // Select error element
  const error = document.querySelector(`#${id} ~ .error`);
  // Remove error class
  error.classList.remove("is-error");
};

/*
 * NAME: validateInput
 * DESCRIPTION: Validates input field value
 * PARAMETERS:
 *   1. field: input field
 *   2. event: input event
 */
const validateInput = (field, event) => {

  // value, classList and ID from event.target
  const {
    value,
    classList,
    id
  } = event.target;

  // If field value is empty, reset border
  value.trim(" ") ? classList.remove("is-empty") : classList.add("is-empty");

  // If pattern or field type mismatch, display error
  if (field.validity.patternMismatch || field.validity.typeMismatch) {
    displayError(id);
  } else {
    // If no error, hide message
    hideError(id);
  }
};

/*
 * NAME: checkSubmission
 * DESCRIPTION: Validates that all fields have been populated
 * PARAMETERS:
 *   1. event: submit event
 */
const checkSubmission = (event) => {

  // Get alert message DOM element
  const alertMsg = document.querySelector(".form__alert");

  // Set header for mmessage
  alertMsg.innerHTML = "<li><h2>Please, complete the following fields:</h2></li>";

  // Loop through all fields
  fieldsArr.forEach((field) => {

    // Check if any field is empty
    if (field.value === "") {

      // Remove hidden class for alert msg
      alertMsg.classList.remove("is-hidden");

      // Get field name and place it in alert message
      alertMsg.innerHTML += `
      <li>${field.dataset.label}</li>
      `;

      // Prevent form for submitting
      event.preventDefault();

    }
  });
};

const init = () => {
  // Disable menuBtn - not relevant for this project
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });

  // For each input, listen to "input" event
  fieldsArr.forEach((field) => {
    // Set the empty class for each field
    field.classList.add("is-empty");

    // Listen to input event listener for every field
    field.addEventListener("input", (e) => {
      // Validate input
      validateInput(field, e);
    });
  });

  // Listen to "submit" event
  form.addEventListener("submit", (e) => {
    // Check fields upon submissions
    checkSubmission(e);
  });
};


/*
 * PROCESS
 */

init();