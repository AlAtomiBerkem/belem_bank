let closeLoading = false;

const para = document.createElement('span');
const node = document.createTextNode(`${data.title}`);
para.appendChild(node);
const element = document.querySelector('.header-info-path');
element.appendChild(para);
const block = document.querySelector('.header-title');
block.textContent = `${data.documents[dataNumber].title}`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1;
});

document.querySelector('.exit').addEventListener('click', (e) => {
  e.preventDefault();
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = e.target.href;
  }, 500);
});

let inactivityTime = 180000;
let timeout;

function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.location.href = '../../main/main.html';
  }, inactivityTime);
}

document.addEventListener('DOMContentLoaded', resetTimer);
['click', 'mousemove', 'keypress', 'touchstart', 'scroll'].forEach((event) => {
  document.addEventListener(event, resetTimer);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());
