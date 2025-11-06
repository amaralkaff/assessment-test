FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    procps

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir -p /var/www/database && \
    touch /var/www/database/database.sqlite && \
    chmod -R 777 /var/www/database

RUN composer install --no-interaction --optimize-autoloader

RUN chown -R www-data:www-data /var/www && \
    chmod -R 755 /var/www/storage

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
