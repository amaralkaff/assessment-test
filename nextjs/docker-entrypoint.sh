#!/bin/sh

set -e

echo "Starting Next.js application"

sleep 2

if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "Next.js application is ready"

exec npm run dev
