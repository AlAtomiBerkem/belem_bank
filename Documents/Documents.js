class DocumentViewer {
  constructor() {
    this.data = JSON.parse(localStorage.getItem('documentFolder'));
    this.simpleBarInstance = null;
    this.initElements();
    this.initEventListeners();
    this.renderInitialContent();
    this.setupInactivityTimer();
  }

  initElements() {
    // Основные элементы DOM
    this.elements = {
      folderBlock: document.querySelector('.documentContainer'),
      container: document.querySelector('.container'),
      inputSearch: document.querySelector('.search'),
      cancelSearch: document.querySelector('.cancelSearch'),
      keyboardBtns: document.querySelectorAll('.btn'),
      deleteBtn: document.querySelector('.delete'),
      fonElement: document.querySelector('.fon'),
      initContainer: document.querySelector('.init'),
      exitBtn: document.querySelector('.exit'),
      pathElement: document.querySelector(".text-path")
    };

    // Добавляем заголовок
    this.addTitleToDOM();
  }

  addTitleToDOM() {
    const para = document.createElement("span");
    para.textContent = this.data.title;
    this.elements.pathElement.appendChild(para);
  }

  // Основные функции работы с контентом
  renderInitialContent() {
    this.clearContainer(this.elements.folderBlock);
    this.populateContainer(this.elements.folderBlock, this.data.documents);
    this.initScrollbar(this.elements.folderBlock);
    this.checkTextOverflow(); // Проверяем переполнение текста после рендеринга
  }

  filterDocuments(searchTerm) {
    if (!searchTerm) return this.data.documents;
    const regex = new RegExp(searchTerm, 'gi');
    return this.data.documents.filter(doc => doc.title.match(regex));
  }

  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  recreateContainer() {
    this.clearContainer(this.elements.initContainer);
    this.elements.initContainer.insertAdjacentHTML('beforeend', 
      '<div class="documentContainer" style="width: 100%;"></div>'
    );
    return document.querySelector('.documentContainer');
  }

  populateContainer(container, documents) {
    documents.forEach(doc => {
      const imgSrc = doc.type === 'folder' ? 'folder.png' : 'documentLogo.png';
      container.insertAdjacentHTML('beforeend', `
        <div id="${doc.id}" class="documentFon">
          <img src="./img/${imgSrc}">
          <div class="document-name-container">
            <span class="document-name">${doc.title}</span>
          </div>
        </div>
      `);
    });
  }

  // Проверка на переполнение текста и добавление анимации
  checkTextOverflow() {
    const documents = document.querySelectorAll('.documentFon');
    
    documents.forEach(doc => {
      const container = doc.querySelector('.document-name-container');
      const textSpan = doc.querySelector('.document-name');
      
      // Небольшая задержка для корректного расчета размеров
      setTimeout(() => {
        const containerWidth = container.offsetWidth;
        const textWidth = textSpan.scrollWidth;
        
        if (textWidth > containerWidth) {
          container.classList.add('marquee');
        }
      }, 50);
    });
  }

  initScrollbar(container) {
    if (this.simpleBarInstance) {
      this.simpleBarInstance.unMount();
    }
    this.simpleBarInstance = new SimpleBar(container);
  }

  // Обработчики событий
  initEventListeners() {
    // Поиск и фильтрация
    this.elements.inputSearch.addEventListener('change', () => {
      const filtered = this.filterDocuments(this.elements.inputSearch.value);
      const container = this.recreateContainer();
      this.populateContainer(container, filtered);
      this.initScrollbar(container);
      this.checkTextOverflow(); // Проверяем переполнение после фильтрации
    });

    // Кнопки клавиатуры
    this.elements.keyboardBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filtered = this.filterDocuments(this.elements.inputSearch.value);
        const container = this.recreateContainer();
        this.populateContainer(container, filtered);
        this.initScrollbar(container);
        this.checkTextOverflow(); // Проверяем переполнение после ввода
      });
    });

    // Кнопка удаления
    this.elements.deleteBtn.addEventListener('click', () => {
      const filtered = this.elements.inputSearch.value 
        ? this.filterDocuments(this.elements.inputSearch.value)
        : this.data.documents;
      const container = this.recreateContainer();
      this.populateContainer(container, filtered);
      this.initScrollbar(container);
      this.checkTextOverflow(); // Проверяем переполнение после удаления
    });

    // Открытие поиска
    this.elements.inputSearch.addEventListener('click', () => {
      this.elements.fonElement.style.display = 'block';
      this.elements.container.style.display = 'block';
      this.animateKeyboard(true);
    });

    // Клик по документу
    this.elements.initContainer.addEventListener("click", (event) => {
      const link = event.target.closest(".documentFon");
      if (!link) return;
      
      event.preventDefault();
      localStorage.setItem('idDocumentFolder', link.id);
      this.fadeOutAndRedirect('../pdfPage/PdfHtml/pdfDoc.html');
    });

    // Кнопка выхода
    this.elements.exitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.fadeOutAndRedirect("../folderDocument/folderDocument.html");
    });

    // Контекстное меню
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.body.oncontextmenu = () => false;
  }

  // Анимации
  animateKeyboard(open) {
    const keyboard = document.querySelector(".keyboard");
    const start = open ? -505 : 25;
    const end = open ? 25 : -505;
    const duration = 500;
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      let progress = Math.min((currentTime - startTime) / duration, 1);
      keyboard.style.bottom = `${start + (end - start) * progress}px`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  fadeOutAndRedirect(url) {
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  }

  // Таймер неактивности
  setupInactivityTimer() {
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        window.location.href = "../main/main.html";
      }, 180000);
    };

    ["click", "mousemove", "keypress", "touchstart", "scroll"].forEach(event => {
      document.addEventListener(event, resetTimer);
    });
    resetTimer();
  }
}

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
  new DocumentViewer();
  document.body.style.opacity = 1;
});