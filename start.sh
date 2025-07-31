#!/bin/zsh

echo "Запускаю скрипт..."

# Перехожу в директорию belem new/backend
cd "belem new/backend" || { echo "Ошибка: не удалось перейти в belem new/backend"; exit 1; }
echo "Запускаю бэкенд..."
node server.js &
BACKEND_PID=$!
cd ../..

# Перехожу в директорию belem new
cd "belem new" || { echo "Ошибка: не удалось перейти в belem new"; exit 1; }
echo "Запускаю фронтенд..."
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Жду 8 секунд, чтобы серверы запустились..."
sleep 8

echo "Пытаюсь открыть Chrome в режиме киоска (полноэкранный)..."
open -a "Google Chrome" --args --kiosk "http://localhost:5173/"

if [ $? -ne 0 ]; then
    echo "Не удалось запустить Chrome в режиме киоска. Пробую открыть в браузере по умолчанию..."
    open "http://localhost:5173/"
fi

echo "Скрипт завершил работу."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Для остановки процессов используйте 'kill $BACKEND_PID $FRONTEND_PID'"
