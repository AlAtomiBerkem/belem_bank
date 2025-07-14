let closeLoading = false;

const para = document.createElement('span');
const node = document.createTextNode(`${data.title}`);
para.appendChild(node);
// Новый код для формирования breadcrumb из массива
const breadcrumbObj = JSON.parse(localStorage.getItem('breadcrumb'));
const element = document.querySelector('.header-info-path');
let breadcrumbArr = [];
if (breadcrumbObj && Array.isArray(breadcrumbObj.breadcrumbArr) && breadcrumbObj.breadcrumbArr.length > 0) {
  breadcrumbArr = breadcrumbObj.breadcrumbArr;
} else {
  // fallback: пробуем взять название документа из объекта
  try {
    const data = JSON.parse(localStorage.getItem('documentFolder'));
    const dataNumber = JSON.parse(localStorage.getItem('idDocumentFolder'));
    if (data && data.documents && data.documents[dataNumber] && data.documents[dataNumber].title) {
      breadcrumbArr = ['Банк', 'Документы', data.documents[dataNumber].title];
    }
  } catch (e) {}
}
if (breadcrumbArr.length > 0) {
  let html = '';
  breadcrumbArr.forEach((part, idx) => {
    html += `<span>${part}</span>`;
    if (idx < breadcrumbArr.length - 1) html += '<span>/</span>';
  });
  element.innerHTML = html;
}
// Название документа в заголовке
const block = document.querySelector('.header-title');
if (breadcrumbArr.length > 0) {
  block.textContent = breadcrumbArr[breadcrumbArr.length - 1];
} else if (typeof data !== 'undefined' && data.documents && data.documents[dataNumber]) {
  block.textContent = data.documents[dataNumber].title;
} else {
  block.textContent = '';
}

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

// Логируем путь из breadcrumb
if (breadcrumbObj && Array.isArray(breadcrumbObj.breadcrumbArr)) {
  console.log('Breadcrumb path:', breadcrumbObj.breadcrumbArr.join('/'));
}
// Логируем путь к PDF из объекта документа
try {
  const data = JSON.parse(localStorage.getItem('documentFolder'));
  const dataNumber = JSON.parse(localStorage.getItem('idDocumentFolder'));
  if (data && data.documents && data.documents[dataNumber]) {
    console.log('Document file path:', data.documents[dataNumber].file);
  }
} catch (e) {
  console.warn('Ошибка при логировании пути документа:', e);
}

// После формирования хлебных крошек и заголовка
if (breadcrumbObj && Array.isArray(breadcrumbObj.breadcrumbArr)) {
  // Найти контейнер для вывода пути (или создать)
  let pathInfo = document.querySelector('.file-path-info');
  if (!pathInfo) {
    pathInfo = document.createElement('div');
    pathInfo.className = 'file-path-info';
    element.parentNode.insertBefore(pathInfo, element.nextSibling);
  }
  // Получить путь к файлу из объекта документа
  let filePath = '';
  try {
    const data = JSON.parse(localStorage.getItem('documentFolder'));
    const dataNumber = JSON.parse(localStorage.getItem('idDocumentFolder'));
    if (data && data.documents && data.documents[dataNumber]) {
      filePath = data.documents[dataNumber].file;
    }
  } catch (e) {}
  if (filePath) {
    pathInfo.textContent = 'Путь к файлу: ' + filePath;
  } else {
    pathInfo.textContent = '';
  }
}
