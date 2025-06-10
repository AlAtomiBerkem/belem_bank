// document.querySelector(".linkBtn").addEventListener("click", event => {
//     event.preventDefault();
//     document.body.classList.add("fade-out");
//     setTimeout(() => {
//         window.location.href = event.target.href;
//     }, 500); // Длительность анимации
// });

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 1;
});

document.querySelector('.linkBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.body.style.opacity = 0;
    console.log(e.target.href);
    setTimeout(() => {
        window.location.href = '../folderDocument/folderDocument.html'; // Переход на новую страницу
    }, 500);
});
document.querySelector('.linkBtn1').addEventListener('click', (e) => {
    e.preventDefault();
    document.body.style.opacity = 0;
    console.log(e.target.href);
    setTimeout(() => {
        window.location.href = '../folderMethodical/folderMethodical.html'; // Переход на новую страницу
    }, 500);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());

document.addEventListener('gesturestart', (event) => {
    event.preventDefault();
});
