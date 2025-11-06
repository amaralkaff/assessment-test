#!/bin/sh

set -e

echo "Starting Next.js application with Bun"

sleep 2

if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
    echo "📦 Installing dependencies with Bun (super fast!)..."
    bun install
fi

echo "Next.js application is ready"

exec bun run dev
