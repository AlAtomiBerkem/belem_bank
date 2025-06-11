const data = JSON.parse(localStorage.getItem('documents'));
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
data.folderDocument.forEach((el) => {
  fullTitle.push(el);
  el.documents.forEach((element) => {
    fullTitle.push(element);
  });
});
console.log('мы находимся на странице folderDocument.html')
const observer = new MutationObserver(() => {
  const spans = document.querySelectorAll('.documentFon-mask > span');
  
  spans.forEach(span => {
    const textLength = span.textContent.length;
    const maxVisibleChars = 72;
    console.log(textLength)
    
    if (textLength > maxVisibleChars) {
      span.style.animation = 'scrollText 10s linear infinite alternate';
      console.log('работает')
    } else {
      console.log('не работатет')
      span.style.animation = 'none';
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

function getFile(word, stations) {
  return stations.filter((s) => {
    const regex = new RegExp(word, 'gi');
    return s.title.match(regex);
  });
}

keyboardBtns.forEach((button) => {
  button.addEventListener('click', (event) => {
    flagKeyboard = false;
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
    const dataFilter = getFile(inputSearch.value, fullTitle);
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
  });
});
deleteBtn.addEventListener('click', (event) => {
  if (inputSearch.value !== '') {
    flagKeyboard = false;
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
    const dataFilter = getFile(inputSearch.value, fullTitle);
    dataFilter.forEach((el) => {
      folderBlockCopy.insertAdjacentHTML(
        'beforeend',
        `
                <a id='${el.id}' class='documentFon' href="${el.source}">
                    <img id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}' src="${el.img}">
                    <div class="documentFon-mask">
                    <span  id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}'>${el.title}</span>
                    </div>
                    </a>
            `
      );
    });
    new SimpleBar(folderBlockCopy);
  } else {
    flagKeyboard = true;
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
    const dataFilter = data.folderDocument;
    dataFilter.forEach((el) => {
      folderBlockCopy.insertAdjacentHTML(
        'beforeend',
        `
                <a id='${el.id}' class='documentFon' href="${el.source}">
                
                    <img src="${el.img}">
                    <div class="documentFon-mask">
                    <span>${el.title}</span>
                    </div>
                </a>
            `
      );
    });
    new SimpleBar(folderBlockCopy);
  }
});

data.folderDocument.forEach((el) => {
  folderBlock.insertAdjacentHTML(
    'beforeend',
    `
        <a id='${el.id}' class='documentFon' href="${el.source}">
            <img src="${el.img}">
            <div class="documentFon-mask">
            <span>${el.title}</span>
            </div>
        </a>
    `
  );
});
new SimpleBar(folderBlock);

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1;
});

document.querySelector('.init').addEventListener('click', (event) => {
  let link = event.target.closest('.documentFon');
  let linkTwo = event.target.closest('.documentFonSpan');
  let linkThree = event.target.closest('.documentFonImg');
  if (!link && !linkTwo && !linkThree) {
    return;
  }

  event.preventDefault();
  if (flagKeyboard === true) {
    localStorage.setItem(
      'documentFolder',
      JSON.stringify(data.folderDocument[link.id])
    );
    localStorage.setItem('idDocumentFolder', JSON.stringify(link.id));
    document.body.style.opacity = 0;
  } else if (flagKeyboard === false && !linkThree) {
    localStorage.setItem(
      'documentFolder',
      JSON.stringify(data.folderDocument[linkTwo.id])
    );
    localStorage.setItem('idDocumentFolder', JSON.stringify(link.id));
    document.body.style.opacity = 0;
  } else {
    localStorage.setItem(
      'documentFolder',
      JSON.stringify(data.folderDocument[linkThree.id])
    );
    localStorage.setItem('idDocumentFolder', JSON.stringify(link.id));
    document.body.style.opacity = 0;
  }

  setTimeout(() => {
    window.location.href = link.href;
  }, 500);
});

document.querySelector('.exit').addEventListener('click', (event) => {
  event.preventDefault();
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = '../main/main.html';
  }, 500);
});

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

document
  .querySelector('.simplebar-scrollbar')
  .addEventListener('click', (e) => {
    console.log(1000);
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
