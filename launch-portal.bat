@echo off
title Launch Development Economics Portal
echo ========================================================
echo   Launching Development Economics Portal (DS 2201)
echo ========================================================
echo.

:: Check if server is already running on port 8080
powershell -Command "$client = New-Object System.Net.Sockets.TcpClient; try { $client.Connect('localhost', 8080); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting local server on http://localhost:8080 ...
    start "" /B powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0server.ps1"
    timeout /t 2 /nobreak >nul
) else (
    echo Local server is already running on port 8080.
)

echo Opening portal in your default browser...
start "" "http://localhost:8080/"

echo.
echo ========================================================
echo   Portal is ready at http://localhost:8080/
echo   You can close this window at any time.
echo ========================================================
timeout /t 3 >nul
exit
