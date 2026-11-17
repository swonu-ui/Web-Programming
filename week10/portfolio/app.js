const toggle=document.getElementById('theme-toggle');
function setTheme(dark){document.body.classList.toggle('dark',dark);toggle.setAttribute('aria-pressed',String(dark));toggle.textContent=dark?'Light mode':'Dark mode';}
try{setTheme(localStorage.getItem('swonu-portfolio-theme')==='dark');}catch{}
toggle.addEventListener('click',()=>{const dark=!document.body.classList.contains('dark');setTheme(dark);try{localStorage.setItem('swonu-portfolio-theme',dark?'dark':'light');}catch{}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{let count=0;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.project').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.getElementById('filter-status').textContent='Showing '+count+' project'+(count===1?'':'s')+'.';}));
