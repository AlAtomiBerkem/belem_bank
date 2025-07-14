const data = documents;
const folderBlock = document.querySelector('.documentContainer');
const folderTitle = document.createElement('div');
const container = document.querySelector('.container');
const inputSearch = document.querySelector('.search');
const cancelSearch = document.querySelector('.cancelSearch');
const keyboardBtns = document.querySelectorAll('.btn');
const deleteBtn = document.querySelector('.delete');
const fonElement = document.querySelector('.fon');
const fullTitle = [];
let flagKeyboard = true;

data.folderDocument.forEach((folder) => {
  fullTitle.push(folder);
  if (folder.subfolders) {
    folder.subfolders.forEach((subfolder) => {
      fullTitle.push(subfolder);
      if (subfolder.documents) {
        subfolder.documents.forEach((doc) => {
          fullTitle.push(doc);
        });
      }
    });
  }
});

console.log('находимся в файле documents html');


const observer = new MutationObserver(() => {
  const spans = document.querySelectorAll('.documentFon-mask > span');
  
  spans.forEach(span => {
    const textLength = span.textContent.length;
    const maxVisibleChars = 72;
    
    if (textLength > maxVisibleChars) {
      span.style.animation = 'scrollText 10s linear infinite alternate';
    } else {
      span.style.animation = 'none';
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

const para = document.createElement('span');
const node = document.createTextNode(`${data.title}`);
para.appendChild(node);
const element = document.querySelector('.text-path');
element.appendChild(para);

// Получаем параметры epoch и theme из URL
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const epoch = getQueryParam('epoch');
const theme = getQueryParam('theme');

// Функция для поиска нужной эпохи и темы
function getDocumentsForTheme(epoch, theme) {
  if (!epoch || !theme) return [];
  const folder = data.folderDocument.find(f => f.title === epoch);
  if (!folder || !folder.subfolders) return [];
  const subfolder = folder.subfolders.find(sf => sf.title === theme);
  if (!subfolder || !subfolder.documents) return [];
  return subfolder.documents;
}

// Обновляем хлебные крошки
const breadcrumb = document.querySelector('.text-path');
if (breadcrumb) {
  breadcrumb.innerHTML = `<span>Банк</span> <span>/</span> <span>Документы</span> <span>/</span> <span>${epoch || ''}</span> <span>/</span> <span>${theme || ''}</span>`;
}

// Основной массив документов для отображения
let currentDocuments = getDocumentsForTheme(epoch, theme);

// Функция для рендера документов
function renderDocuments(docs) {
  folderBlock.innerHTML = '';
  docs.forEach((el) => {
    folderBlock.insertAdjacentHTML(
      'beforeend',
      `
        <div id='${el.id}' class='documentFon'>
            <img src="./img/documentLogo.png">
            <div class="documentFon-mask">
            <span>${el.title}</span>
            </div>
        </div>
      `
    );
  });
  new SimpleBar(folderBlock);
  // Навешиваем обработчик клика на каждый документ
  document.querySelectorAll('.documentFon').forEach(docEl => {
    docEl.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.setItem('documentFolder', JSON.stringify({ documents: docs }));
      localStorage.setItem('idDocumentFolder', docEl.id);
      // Новый код: формируем путь из поля file или только из названия
      const clickedDoc = docs.find(d => d.id == docEl.id);
      let breadcrumbArr = ['Банк', 'Документы'];
      if (clickedDoc && clickedDoc.file) {
        const fileParts = clickedDoc.file.replace(/\\/g, '/').split('/');
        breadcrumbArr = breadcrumbArr.concat(fileParts.slice(0, -1));
        const fileName = fileParts[fileParts.length - 1].replace(/\.[^.]+$/, '');
        breadcrumbArr.push(fileName);
      } else if (clickedDoc && clickedDoc.title) {
        breadcrumbArr.push(clickedDoc.title);
        console.warn('Документ без поля file:', clickedDoc);
      }
      console.log('breadcrumbArr при клике:', breadcrumbArr);
      localStorage.setItem('breadcrumb', JSON.stringify({
        breadcrumbArr
      }));
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = '../pdfPage/PdfHtml/pdfDoc.html';
      }, 500);
    });
  });
}

// Поиск по документам
function getFile(word, stations) {
  return stations.filter((s) => {
    const regex = new RegExp(word, 'gi');
    return s.title.match(regex);
  });
}

// Обработчик поиска
inputSearch.addEventListener('input', (event) => {
  const value = inputSearch.value;
  const filtered = getFile(value, currentDocuments);
  renderDocuments(filtered);
});

// Инициализация страницы
renderDocuments(currentDocuments);

keyboardBtns.forEach((button) => {
  button.addEventListener('click', (event) => {
    const init = document.querySelector('.init');
    let child = init.lastElementChild;
    while (child) {
      init.removeChild(child);
      child = init.lastElementChild;
    }
    init.insertAdjacentHTML(
      'beforeend',
      `<div class='documentContainer' style="width: 100%;"></div>`
    );
    const folderBlockCopy = document.querySelector('.documentContainer');
    const dataFilter = getFile(inputSearch.value, data.documents);
    dataFilter.forEach((el) => {
      folderBlockCopy.insertAdjacentHTML(
        'beforeend',
        `
                <div id='${el.id}' class='documentFon'>
                    <img src="./img/documentLogo.png">
                    <div class="documentFon-mask">
                    <span>${el.title}</span>
                    </div>
                </div>
            `
      );
    });
    new SimpleBar(folderBlockCopy);
  });
});
deleteBtn.addEventListener('click', (event) => {
  if (inputSearch !== '') {
    const init = document.querySelector('.init');
    let child = init.lastElementChild;
    while (child) {
      init.removeChild(child);
      child = init.lastElementChild;
    }
    init.insertAdjacentHTML(
      'beforeend',
      `<div class='documentContainer' style="width: 100%;"></div>`
    );
    const folderBlockCopy = document.querySelector('.documentContainer');
    const dataFilter = getFile(inputSearch.value, data.documents);
    dataFilter.forEach((el) => {
      folderBlockCopy.insertAdjacentHTML(
        'beforeend',
        `
                <div id='${el.id}' class='documentFon'>
                    <img src="./img/documentLogo.png">
                    <div class="documentFon-mask">
                    <span>${el.title}</span>
                    </div>
                </div>
            `
      );
    });
    new SimpleBar(folderBlockCopy);
  } else {
    const folderBlockCopy = document.querySelector('.documentContainer');
    const dataFilter = data.documents;
    dataFilter.forEach((el) => {
      folderBlockCopy.insertAdjacentHTML(
        'beforeend',
        `
                <div id='${el.id}' class='documentFon'>
                    <img src="./img/documentLogo.png">
                    <div class="documentFon-mask">
                    <span>${el.title}</span>
                    </div>
                </div>
            `
      );
    });
    new SimpleBar(folderBlockCopy);
  }
});

data.documents.forEach((el) => {
  folderBlock.insertAdjacentHTML(
    'beforeend',
    `
                <div id='${el.id}' class='documentFon'>
                    <img src="./img/documentLogo.png">
                    <div class="documentFon-mask">
                    <span>${el.title}</span>
                    </div>
                </div>
            `
  );
});
new SimpleBar(folderBlock);

document.body.oncontextmenu = function (e) {
  return false;
};

document.querySelector('.search').addEventListener('click', (event) => {
  fonElement.style.display = 'block';
  container.style.display = 'block';
  const keyboard = document.querySelector('.keyboard');
  const isOpen = parseInt(window.getComputedStyle(keyboard).bottom) < 0;
  animateKeyboard(isOpen);
});

function animateKeyboard(open) {
  const keyboard = document.querySelector('.keyboard');
  let start = open ? -505 : 25;
  let end = open ? 25 : -505;
  let duration = 500; // Время анимации в миллисекундах
  let startTime = null;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    let progress = (currentTime - startTime) / duration;

    if (progress > 1) progress = 1;

    keyboard.style.bottom = start + (end - start) * progress + 'px';

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1;
});

document.querySelector('.exit').addEventListener('click', (event) => {
  event.preventDefault();
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = '../folderDocument/folderDocument.html';
  }, 500);
});

let inactivityTime = 180000; // 3 минуты (в миллисекундах)
let timeout;

function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.location.href = '../main/main.html';
  }, inactivityTime);
}

document.addEventListener('DOMContentLoaded', resetTimer);

['click', 'mousemove', 'keypress', 'touchstart', 'scroll'].forEach((event) => {
  document.addEventListener(event, resetTimer);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());
