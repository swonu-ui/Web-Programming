let todos = [];
let input = '';

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const emptyState = document.getElementById('emptyState');

todoInput.addEventListener('input', () => {
  input = todoInput.value;
});

function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const item = document.createElement('li');

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;

    const text = document.createElement('span');
    text.textContent = todo.text;
    text.className = todo.done ? 'done' : '';

    checkbox.addEventListener('change', () => {
      todos = todos.map(t => t.id === todo.id ? { ...t, done: !t.done } : t);
      renderTodos();
    });

    label.append(checkbox, text);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = '✕';
    removeButton.setAttribute('aria-label', `Remove ${todo.text}`);
    removeButton.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      renderTodos();
    });

    item.append(label, removeButton);
    todoList.appendChild(item);
  });

  emptyState.hidden = todos.length > 0;
  const left = todos.filter(todo => !todo.done).length;
  todoCount.textContent = `${left} of ${todos.length} left`;
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!input.trim()) return;

  todos = [...todos, { id: Date.now(), text: input.trim(), done: false }];
  input = '';
  todoInput.value = '';
  renderTodos();
});

renderTodos();
