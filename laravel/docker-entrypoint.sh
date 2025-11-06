#!/bin/bash

set -e

echo "Starting Laravel application"

sleep 2

mkdir -p /var/www/database
touch /var/www/database/database.sqlite
chmod -R 777 /var/www/database

if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.example /var/www/.env
fi

if ! grep -q "APP_KEY=base64:" /var/www/.env; then
    php artisan key:generate --force
fi

if ! grep -q "JWT_SECRET=" /var/www/.env; then
    php artisan jwt:secret --force
fi

php artisan migrate --force

php artisan config:clear
php artisan config:cache

echo "Laravel application is ready"

exec php artisan serve --host=0.0.0.0 --port=8000
