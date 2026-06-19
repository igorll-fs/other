#!/usr/bin/env bash
set -euo pipefail

# Configuration
REMOTE_USER="${DEPLOY_USER:-deploy}"
REMOTE_HOST="${DEPLOY_HOST:-your-server.com}"
REMOTE_PATH="${DEPLOY_PATH:-/var/www/otherbowlingbar.com}"
BUILD_DIR="dist"

echo "==> Building production bundle..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "ERROR: Build directory '$BUILD_DIR' not found. Build may have failed."
  exit 1
fi

echo "==> Deploying to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH} ..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  "${BUILD_DIR}/" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "==> Deploy complete!"
