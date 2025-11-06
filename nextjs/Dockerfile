FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb* ./

# Copy application code (node_modules excluded via .dockerignore)
COPY . .

# Copy and set entrypoint script permissions
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

# Dependencies will be installed at runtime via entrypoint
# Bun is 10-100x faster than npm, especially on Windows
ENTRYPOINT ["docker-entrypoint.sh"]
