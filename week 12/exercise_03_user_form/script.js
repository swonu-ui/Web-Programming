const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const ageInput = document.getElementById("ageInput");
const stateOutput = document.getElementById("stateOutput");
const userForm = document.getElementById("userForm");
const submittedState = document.getElementById("submittedState");
const thanksText = document.getElementById("thanksText");
const editAgain = document.getElementById("editAgain");

let submitted = false;

function updateStateOutput() {
  stateOutput.textContent = `Right now: name = '${nameInput.value}', email = '${emailInput.value}', age = ${Number(ageInput.value)}, submitted = ${submitted}`;
}

nameInput.addEventListener("input", updateStateOutput);
emailInput.addEventListener("input", updateStateOutput);
ageInput.addEventListener("input", updateStateOutput);

userForm.addEventListener("submit", event => {
  event.preventDefault();
  submitted = true;
  updateStateOutput();

  const name = nameInput.value.trim() || "friend";
  const email = emailInput.value.trim() || "(none)";
  const age = Number(ageInput.value);
  thanksText.textContent = `Thanks, ${name}! Email: ${email}, Age: ${age}`;
  userForm.hidden = true;
  submittedState.classList.add("show");
});

editAgain.addEventListener("click", () => {
  submitted = false;
  updateStateOutput();
  submittedState.classList.remove("show");
  userForm.hidden = false;
  nameInput.focus();
});
