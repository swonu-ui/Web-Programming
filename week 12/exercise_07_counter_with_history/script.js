let count = 0;
let history = [0];

const countOutput = document.getElementById('historyCount');
const historyOutput = document.getElementById('historyOutput');
const undoButton = document.getElementById('undoButton');

function render() {
  countOutput.textContent = count;
  historyOutput.textContent = `History (last 5): [${history.slice(-5).join(', ')}]`;
  undoButton.disabled = history.length < 2;
}

function change(next) {
  count = next;
  history = [...history, next];
  render();
}

document.getElementById('incrementButton').addEventListener('click', () => {
  change(count + 1);
});

document.getElementById('decrementButton').addEventListener('click', () => {
  change(count - 1);
});

document.getElementById('resetButton').addEventListener('click', () => {
  change(0);
});

undoButton.addEventListener('click', () => {
  if (history.length < 2) return;
  count = history[history.length - 2];
  history = history.slice(0, -1);
  render();
});

render();
