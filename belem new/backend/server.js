// backend/server.js

const express = require('express');
const path = require('path');

const app = express();

// Папки с документами
const DOCUMENTS_DIR = path.join(__dirname, '../src/library/documents');
const MATERIALS_DIR = path.join(__dirname, '../src/library/materials');

const cors = require('cors');
app.use(cors());

// Общая функция для безопасной отправки файлов
const sendFileSecurely = (filePath, baseDir, res) => {
  if (!filePath.startsWith(baseDir)) {
    return res.status(403).send('Access denied');
  }
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
};

// 1. Отдаём файлы из раздела documents
app.get('/api/files/documents/*', (req, res) => {
  const relPath = req.params[0];
  const filePath = path.join(DOCUMENTS_DIR, relPath);
  sendFileSecurely(filePath, DOCUMENTS_DIR, res);
});

// 2. Отдаём файлы из раздела materials
app.get('/api/files/materials/*', (req, res) => {
  const relPath = req.params[0];
  const filePath = path.join(MATERIALS_DIR, relPath);
  sendFileSecurely(filePath, MATERIALS_DIR, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server started on http://localhost:${PORT}`);
  console.log(`Documents available at http://localhost:${PORT}/api/files/documents/<path>`);
  console.log(`Materials available at http://localhost:${PORT}/api/files/materials/<path>`);
}); 