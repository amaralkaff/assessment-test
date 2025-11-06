FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy application code (node_modules excluded via .dockerignore)
COPY . .

# Copy and set entrypoint script permissions
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

# Dependencies will be installed at runtime via entrypoint
# This makes builds much faster, especially on Windows
ENTRYPOINT ["docker-entrypoint.sh"]
