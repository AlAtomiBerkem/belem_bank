const data = JSON.parse(localStorage.getItem('documents'));
console.log(data);
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
data.folderMethodical.forEach((el) => {
    console.log(el);
    fullTitle.push(el);
    el.documents.forEach((element) => {
        fullTitle.push(element);
    });
});

function getFile(word, stations) {
    return stations.filter((s) => {
        const regex = new RegExp(word, 'gi');
        return s.title.match(regex);
    });
}

inputSearch.addEventListener('change', (event) => {
    console.log(getFile(inputSearch.value, data.folderMethodical));
});
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
        <img class="documentFonImg" id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}' src="${el.img}">
        <div class="documentFon-mask">  <!-- Исправлено здесь -->
          <span class='documentFonSpan' id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}'>${el.title}</span>
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
        <img class="documentFonImg" id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}' src="${el.img}">
        <div class="documentFon-mask">  <!-- Исправлено здесь -->
          <span class='documentFonSpan' id='${el.idFolderDocument === undefined ? el.id : el.idFolderDocument}'>${el.title}</span>
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
        const dataFilter = data.folderMethodical;
        dataFilter.forEach((el) => {
            folderBlockCopy.insertAdjacentHTML(
                'beforeend',
                `
                <a id='${el.id}' class='documentFon' href="${el.source}">
                    <img src="${el.img}">
                    <span>${el.title}</span>
                </a>
            `
            );
        });
        new SimpleBar(folderBlockCopy);
    }
});

data.folderMethodical.forEach((el) => {
    folderBlock.insertAdjacentHTML(
        'beforeend',
        `
        <a id='${el.id}' class='documentFon' href="${el.source}">
            <img src="${el.img}">
            <span>${el.title}</span>
        </a>
    `
    );
});
new SimpleBar(folderBlock);
//
document.querySelectorAll('.documentFon').forEach((item) => {
    item.addEventListener('click', (event) => {
        localStorage.setItem(
            'documentFolder',
            JSON.stringify(data.folderMethodical[event.target.id])
        );
        localStorage.setItem('idDocumentFolder', event.target.id);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 1;
});
// document.querySelectorAll(".documentFon").forEach((link, index) => {
//     console.log(data.folderMethodical[index])
//     link.addEventListener("click", event => {
//         event.preventDefault();
//         document.body.style.opacity = 0;
//         localStorage.setItem('idDocumentFolder', index)
//         setTimeout(() => {
//             window.location.href = data.folderMethodical[index].source;
//         }, 500);
//     });
// });
document.querySelector('.init').addEventListener('click', (event) => {
    let link = event.target.closest('.documentFon');
    let linkTwo = event.target.closest('.documentFonSpan');
    let linkThree = event.target.closest('.documentFonImg');
    if (!link && !linkTwo && !linkThree) {
        return;
    } else {
        console.log('Клик был на одном из элементов');
    }
    event.preventDefault();
    if (flagKeyboard === true) {
        console.log('хуй1111');
        localStorage.setItem(
            'documentFolder',
            JSON.stringify(data.folderMethodical[link.id])
        );
        localStorage.setItem('idDocumentFolder', JSON.stringify(link.id));
        document.body.style.opacity = 0;
    } else if (flagKeyboard === false && !linkThree) {
        console.log('хуй22222');
        localStorage.setItem(
            'documentFolder',
            JSON.stringify(data.folderMethodical[linkTwo.id])
        );
        localStorage.setItem('idDocumentFolder', JSON.stringify(link.id));
        document.body.style.opacity = 0;
    } else {
        localStorage.setItem(
            'documentFolder',
            JSON.stringify(data.folderMethodical[linkThree.id])
        );
        localStorage.setItem('idDocumentFolder', JSON.stringify(link.id));
        document.body.style.opacity = 0;
    }
    setTimeout(() => {
        window.location.href = link.href;
    }, 500);
});
// document.querySelector(".init").addEventListener("click", event => {
//     let link = event.target.closest(".documentFon"); // Проверяем, был ли клик внутри .documentFon
//     if (!link) return; // Если клик был не по нужному элементу, выходим

//     event.preventDefault();
//     //document.body.style.opacity = 0;
//     localStorage.setItem('documentFolder', JSON.stringify(data.folderDocument[event.target.id]))
//     localStorage.setItem('idDocumentFolder', event.target.id)

//     setTimeout(() => {
//         window.location.href = link.href; // Переход на новую страницу
//     }, 500);
// });

document.querySelector('.exit').addEventListener('click', (event) => {
    event.preventDefault();
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = '../main/main.html'; // Переход на новую страницу
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

document.body.addEventListener('click', (e) => {
    console.log(e.target);
});

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

// Запуск таймера при загрузке страницы
document.addEventListener('DOMContentLoaded', resetTimer);

// Сброс таймера при взаимодействии пользователя (нажатия, движения, скроллы)
['click', 'mousemove', 'keypress', 'touchstart', 'scroll'].forEach((event) => {
    console.log(2);
    document.addEventListener(event, resetTimer);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());
