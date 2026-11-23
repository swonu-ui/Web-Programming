let user = { name: '', email: '', bio: '' };

const profileForm = document.getElementById('profileForm');
const stateObject = document.getElementById('stateObject');

profileForm.addEventListener('submit', event => event.preventDefault());

profileForm.querySelectorAll('input, textarea').forEach(control => {
  control.addEventListener('input', () => {
    const field = control.name;
    const value = control.value;

    user = { ...user, [field]: value }; // computed property + spread
    stateObject.textContent = JSON.stringify(user, null, 2);
  });
});
