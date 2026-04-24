#!/bin/bash

# agents-radar daily run script
# This script runs the daily digest generation and commits the results

set -e  # Exit on error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/daily-$(date +%Y-%m-%d).log"

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "Starting agents-radar daily run"
log "=========================================="

# Change to project directory
cd "$PROJECT_DIR"

# Load environment variables from .env if it exists
if [ -f .env ]; then
    log "Loading environment variables from .env"
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if LLM server is running
log "Checking LLM server connection..."
if ! curl -s -f "${OPENAI_BASE_URL:-http://localhost:20128/v1}/models" > /dev/null 2>&1; then
    log "ERROR: LLM server is not responding at ${OPENAI_BASE_URL:-http://localhost:20128/v1}"
    log "Please make sure your LLM server (Ollama, LM Studio, etc.) is running"
    exit 1
fi
log "✓ LLM server is running"

# Check if GitHub token is set
if [ -z "$GITHUB_TOKEN" ]; then
    log "ERROR: GITHUB_TOKEN is not set"
    exit 1
fi
log "✓ GitHub token is set"

# Run the digest generation
log "Running digest generation..."
if pnpm start >> "$LOG_FILE" 2>&1; then
    log "✓ Digest generation completed successfully"
else
    log "ERROR: Digest generation failed"
    exit 1
fi

# Generate manifest and RSS feed
log "Generating manifest and RSS feed..."
if pnpm manifest >> "$LOG_FILE" 2>&1; then
    log "✓ Manifest and RSS feed generated"
else
    log "ERROR: Manifest generation failed"
    exit 1
fi

# Commit and push changes
log "Committing changes to git..."
DATE=$(date +%Y-%m-%d)

# Check if there are changes to commit
if git diff --quiet && git diff --cached --quiet; then
    log "No changes to commit"
else
    git add digests/ manifest.json feed.xml
    git commit -m "📊 Daily digest: $DATE" >> "$LOG_FILE" 2>&1
    
    log "Pushing to GitHub..."
    if git push >> "$LOG_FILE" 2>&1; then
        log "✓ Changes pushed to GitHub"
    else
        log "ERROR: Failed to push to GitHub"
        exit 1
    fi
fi

# Send Telegram notification (if configured)
if [ -n "$TELEGRAM_BOT_TOKEN" ]; then
    log "Sending Telegram notification..."
    if pnpm notify >> "$LOG_FILE" 2>&1; then
        log "✓ Telegram notification sent"
    else
        log "WARNING: Telegram notification failed"
    fi
fi

# Clean up old logs (keep last 30 days)
log "Cleaning up old logs..."
find "$LOG_DIR" -name "daily-*.log" -mtime +30 -delete

log "=========================================="
log "Daily run completed successfully!"
log "=========================================="
