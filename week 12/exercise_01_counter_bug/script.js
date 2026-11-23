// This example deliberately recreates the CounterBug behavior:
// the variable changes, but the rendered count does not re-render.
let count = 0;

const incrementButton = document.getElementById("incrementButton");
const log = document.getElementById("log");

incrementButton.addEventListener("click", () => {
  count++;
  log.textContent += ` ${count}`;
});
