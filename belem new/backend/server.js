// backend/server.js

const express = require('express');
const path = require('path');

const app = express();

// Папка, где лежат все документы
const DOCUMENTS_DIR = path.join(__dirname, '../src/library/documents');

const cors = require('cors');
app.use(cors());

// 1. Отдаём любой PDF-файл по относительному пути
app.get('/api/files/*', (req, res) => {
  // Получаем относительный путь к файлу из URL
  const relPath = req.params[0];
  // Абсолютный путь к файлу
  const filePath = path.join(DOCUMENTS_DIR, relPath);
  if (!filePath.startsWith(DOCUMENTS_DIR)) {
    return res.status(403).send('Access denied');
  }
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server started on http://localhost:${PORT}`);
  console.log(`PDF files available at http://localhost:${PORT}/api/files/<relative_path_to_pdf>`);
}); 