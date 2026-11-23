let count = 0;

const countValue = document.getElementById("countValue");

function render() {
  countValue.textContent = count;
}

document.getElementById("decrementButton").addEventListener("click", () => {
  count--;
  render();
});

document.getElementById("incrementButton").addEventListener("click", () => {
  count++;
  render();
});

document.getElementById("resetButton").addEventListener("click", () => {
  count = 0;
  render();
});

document.getElementById("staleButton").addEventListener("click", () => {
  const snapshot = count;
  count = snapshot + 1;
  count = snapshot + 1;
  count = snapshot + 1;
  render();
});

document.getElementById("functionalButton").addEventListener("click", () => {
  count += 1;
  count += 1;
  count += 1;
  render();
});
