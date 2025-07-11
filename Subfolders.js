// Получаем параметры эпохи из URL (например, ?epoch=1920-1930)
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const epoch = getQueryParam('epoch');
const container = document.getElementById('subfoldersContainer');
const breadcrumb = document.getElementById('breadcrumb');
const searchInput = document.getElementById('search');
const errorBlock = document.getElementById('subfoldersError');

// Формируем хлебные крошки
if (breadcrumb && epoch) {
  breadcrumb.innerHTML = `<span>Банк</span> / <span>${epoch}</span> / <span>Темы</span>`;
}

function showError(msg) {
  if (errorBlock) {
    errorBlock.style.display = 'block';
    errorBlock.textContent = msg;
  }
}

function renderSubfolders(subfolders) {
  container.innerHTML = '';
  if (!subfolders.length) {
    showError('Темы не найдены.');
    return;
  }
  if (errorBlock) errorBlock.style.display = 'none';
  subfolders.forEach(subfolder => {
    const a = document.createElement('a');
    a.className = 'documentFon';
    a.href = `Documents.html?epoch=${encodeURIComponent(epoch)}&theme=${encodeURIComponent(subfolder.title)}`;
    a.innerHTML = `
      <img src="folderDocument/img/folder.png">
      <div class="documentFon-mask">
        <span>${subfolder.title}</span>
      </div>
    `;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = a.href;
      }, 500);
    });
    container.appendChild(a);
  });
}

function fetchSubfolders() {
  try {
    if (typeof documents === 'undefined' || !documents.folderDocument) {
      throw new Error('Данные о документах не найдены. Проверьте подключение dataDocuments.js.');
    }
    const folder = documents.folderDocument.find(f => f.title === epoch);
    if (!folder) {
      throw new Error('Эпоха не найдена. Проверьте правильность ссылки.');
    }
    if (!folder.subfolders || !Array.isArray(folder.subfolders) || folder.subfolders.length === 0) {
      throw new Error('В выбранной эпохе нет тем.');
    }
    return folder.subfolders;
  } catch (err) {
    showError(err.message);
    return [];
  }
}

function filterAndRender() {
  const subfolders = fetchSubfolders();
  const value = (searchInput ? searchInput.value : '').toLowerCase();
  const filtered = subfolders.filter(sf => sf.title.toLowerCase().includes(value));
  renderSubfolders(filtered);
}

if (searchInput) {
  searchInput.addEventListener('input', filterAndRender);
}

document.addEventListener('DOMContentLoaded', filterAndRender); 