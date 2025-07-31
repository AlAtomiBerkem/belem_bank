@echo off
REM Start backend in a new terminal window
start "Backend" cmd /k "cd /d "%~dp0belem new\backend" && node server.js"

REM Start frontend in a new terminal window
start "Frontend" cmd /k "cd /d "%~dp0belem new" && npm run dev"

REM Wait 8 seconds for frontend to start
timeout /t 8 /nobreak

REM Open Chrome in kiosk (fullscreen) mode
start "" "chrome.exe" --kiosk "http://localhost:5173/"

REM If Chrome does not open, try specifying the full path:
REM start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "http://localhost:5173/"

echo All processes started!