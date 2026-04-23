@echo off
REM agents-radar daily run script for Windows
REM This script runs the daily digest generation and commits the results

setlocal enabledelayedexpansion

REM Configuration
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set LOG_DIR=%PROJECT_DIR%\logs
set LOG_FILE=%LOG_DIR%\daily-%date:~0,4%-%date:~5,2%-%date:~8,2%.log

REM Create log directory if it doesn't exist
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

REM Function to log messages
call :log "=========================================="
call :log "Starting agents-radar daily run"
call :log "=========================================="

REM Change to project directory
cd /d "%PROJECT_DIR%"

REM Load environment variables from .env if it exists
if exist .env (
    call :log "Loading environment variables from .env"
    for /f "usebackq tokens=*" %%a in (.env) do (
        set "line=%%a"
        if not "!line:~0,1!"=="#" (
            set "%%a"
        )
    )
)

REM Check if LLM server is running
call :log "Checking LLM server connection..."
if "%OPENAI_BASE_URL%"=="" set OPENAI_BASE_URL=http://localhost:20128/v1
curl -s -f "%OPENAI_BASE_URL%/models" >nul 2>&1
if errorlevel 1 (
    call :log "ERROR: LLM server is not responding at %OPENAI_BASE_URL%"
    call :log "Please make sure your LLM server (Ollama, LM Studio, etc.) is running"
    exit /b 1
)
call :log "✓ LLM server is running"

REM Check if GitHub token is set
if "%GITHUB_TOKEN%"=="" (
    call :log "ERROR: GITHUB_TOKEN is not set"
    exit /b 1
)
call :log "✓ GitHub token is set"

REM Run the digest generation
call :log "Running digest generation..."
pnpm start >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    call :log "ERROR: Digest generation failed"
    exit /b 1
)
call :log "✓ Digest generation completed successfully"

REM Generate manifest and RSS feed
call :log "Generating manifest and RSS feed..."
pnpm manifest >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    call :log "ERROR: Manifest generation failed"
    exit /b 1
)
call :log "✓ Manifest and RSS feed generated"

REM Commit and push changes
call :log "Committing changes to git..."
set DATE=%date:~0,4%-%date:~5,2%-%date:~8,2%

REM Check if there are changes to commit
git diff --quiet
if errorlevel 1 goto :has_changes
git diff --cached --quiet
if errorlevel 1 goto :has_changes
call :log "No changes to commit"
goto :after_commit

:has_changes
git add digests/ manifest.json feed.xml
git commit -m "📊 Daily digest: %DATE%" >> "%LOG_FILE%" 2>&1

call :log "Pushing to GitHub..."
git push >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    call :log "ERROR: Failed to push to GitHub"
    exit /b 1
)
call :log "✓ Changes pushed to GitHub"

:after_commit

REM Send Telegram notification (if configured)
if not "%TELEGRAM_BOT_TOKEN%"=="" (
    call :log "Sending Telegram notification..."
    pnpm notify >> "%LOG_FILE%" 2>&1
    if errorlevel 1 (
        call :log "WARNING: Telegram notification failed"
    ) else (
        call :log "✓ Telegram notification sent"
    )
)

REM Clean up old logs (keep last 30 days)
call :log "Cleaning up old logs..."
forfiles /p "%LOG_DIR%" /m daily-*.log /d -30 /c "cmd /c del @path" 2>nul

call :log "=========================================="
call :log "Daily run completed successfully!"
call :log "=========================================="

exit /b 0

:log
echo [%date% %time%] %~1
echo [%date% %time%] %~1 >> "%LOG_FILE%"
goto :eof
