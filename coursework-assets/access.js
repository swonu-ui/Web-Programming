document.addEventListener('click', (event) => {
    const skipLink = event.target.closest('a.skip[href^="#"]');
    if (!skipLink) return;

    const target = document.querySelector(skipLink.getAttribute('href'));
    if (target) target.focus({ preventScroll: true });
});