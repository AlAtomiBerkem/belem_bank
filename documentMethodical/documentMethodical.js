const data = documents;
console.log(data.documents);
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

const para = document.createElement('span');
const node = document.createTextNode(`${data.title}`);
para.appendChild(node);
const element = document.querySelector('.text-path');
element.appendChild(para);

console.log('мы находимся на странице documentMethodical.html')

// const observer = new MutationObserver(() => {
//   const spans = document.querySelectorAll('.documentFon-mask > span');
  
//   spans.forEach(span => {
//     const textLength = span.textContent.length;
//     const maxVisibleChars = 72;
    
//     if (textLength > maxVisibleChars) {
//       span.style.animation = 'scrollText 10s linear infinite alternate';
//     } else {
//       span.style.animation = 'none';
//     }
//   });
// });

observer.observe(document.body, { childList: true, subtree: true });

function getFile(word, stations) {
  return stations.filter((s) => {
    const regex = new RegExp(word, 'gi');
    return s.title.match(regex);
  });
}

inputSearch.addEventListener('change', (event) => {
  console.log(getFile(inputSearch.value, data.documents));
});
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
                    <img src="./img/documentLogo.png"">
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
      <a id='${el.id}' class='documentFon' href="${el.source}">
        <img id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}' src="${el.img}">
        <div class="documentFon-mask">
          <span id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}'>${el.title}</span>
        </div>
      </a>
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
  console.log(inputSearch.value);
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
  let duration = 500;
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

console.log(data);

document.addEventListener('DOMContentLoaded', () => {
  // document.body.style.opacity = 1;
});

document.querySelector('.init').addEventListener('click', (event) => {
  let link = event.target.closest('.documentFon');
  if (!link) {
    return;
  } else {
    console.log('Клик был на одном из элементов');
  }

  event.preventDefault();
  localStorage.setItem('idDocumentFolder', link.id);
  document.body.style.opacity = 0;
  console.log(data.documents[link.id].source);
  setTimeout(() => {
    window.location.href = '../pdfPage/PdfHtml/pdfDoc1.html';
  }, 500);
});

document.querySelector('.exit').addEventListener('click', (event) => {
  event.preventDefault();
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = '../folderMethodical/folderMethodical.html';
  }, 500);
});

let inactivityTime = 180000; 
let timeout;

function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.location.href = '../main/main.html';
  }, inactivityTime);
}

document.addEventListener('DOMContentLoaded', resetTimer);

['click', 'mousemove', 'keypress', 'touchstart', 'scroll'].forEach((event) => {
  console.log(2);
  document.addEventListener(event, resetTimer);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());
