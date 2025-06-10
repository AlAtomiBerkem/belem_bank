 let closeLoading = false;
// setTimeout(() => {
//     document.querySelector('.gifLoading').style.opacity = 0;
//     setTimeout(() => {
//         console.log(1);
//         document.querySelector('.gifLoading').style.display = "none"; // Полностью скрываем
//         document.querySelector('.info').style.opacity = 1;
//         document.querySelector('.info').style.display = 'block';
//     }, 250);
//     closeLoading = true;
// },3000)
console.log(data)
const para = document.createElement("span");
const node = document.createTextNode(`${data.title}`);
para.appendChild(node);
const element = document.querySelector(".header-info-path");
element.appendChild(para);
const block = document.querySelector(".header-title");
console.log(data.documents[dataNumber].title)
block.textContent = `${data.documents[dataNumber].title}`;

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = 1;
});

document.querySelector('.exit').addEventListener('click', e => {
    e.preventDefault();
    document.body.style.opacity = 0;
    console.log(e.target.href)
    console.log(10)
    setTimeout(() => {
        window.location.href = e.target.href; // Переход на новую страницу
    }, 500);
}) 

let inactivityTime = 180000; // 3 минуты (в миллисекундах)
let timeout;

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        window.location.href = "../../main/main.html";
    }, inactivityTime);
}

// Запуск таймера при загрузке страницы
document.addEventListener("DOMContentLoaded", resetTimer);
console.log('инициализируем скролл');
// Сброс таймера при взаимодействии пользователя (нажатия, движения, скроллы)
["click", "mousemove", "keypress", "touchstart", "scroll"].forEach(event => {
    console.log(2)
    document.addEventListener(event, resetTimer);
    console.log(document.element('scroll'))
});

document.addEventListener('contextmenu', event => event.preventDefault());
    // if(closeLoading) {
    //     setTimeout(() => {
    //         console.log(1)
    //         document.querySelector('.gifLoading').style.display = 'none';
    //         closeLoading = true;
    //     },200)
    // }