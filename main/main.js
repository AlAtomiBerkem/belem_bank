document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1;
});

document.querySelector('.linkBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = '../folderDocument/folderDocument.html';
  }, 500);
});
document.querySelector('.linkBtn1').addEventListener('click', (e) => {
  e.preventDefault();
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = '../folderMethodical/folderMethodical.html';
  }, 500);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());

document.addEventListener('gesturestart', (event) => {
  event.preventDefault();
});
