const buttons = document.querySelectorAll('.btn');
const input = document.querySelector('.search');
const containerBoard = document.querySelector('.containerOne');

const delete_btn = document.querySelector('.delete');
const shift_btn = document.querySelector('.shift');
const space_btn = document.querySelector('.space');
const esc_btn = document.querySelector('.esc');

let chars = [];

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    input.value += btn.innerText;
    chars = input.value.split('');
  });
});

delete_btn.addEventListener('click', () => {
  chars.pop();
  input.value = chars.join('');
});

space_btn.addEventListener('click', () => {
  chars.push(' ');
  input.value = chars.join('');
});

shift_btn.addEventListener('click', () => {
  buttons.forEach((btn) => {
    btn.classList.toggle('upper');
  });
});

esc_btn.addEventListener('click', (event) => {
  const keyboard = document.querySelector('.keyboard');
  const isOpen = parseInt(window.getComputedStyle(keyboard).bottom) < 0;
  animateKeyboard(isOpen);

  setTimeout(() => {
    fonElement.style.display = 'none';
    containerBoard.style.display = 'none';
  }, 500);
});

function animateKeyboard(open) {
  const keyboard = document.querySelector('.keyboard');
  let start = open ? -88 : 440;
  let end = open ? 440 : -88;
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
