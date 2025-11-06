# Posts App

A simple blog application with Laravel backend and Next.js frontend.

## Tech Stack

**Backend:** Laravel 12 + SQLite + JWT Auth
**Frontend:** Next.js 16 + TypeScript + Tailwind CSS + DaisyUI

## Setup

### Option 1: Docker (Recommended)

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

### Option 2: Manual Setup

**Prerequisites**
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

**Backend**

```bash
cd laravel
composer install
cp .env.example .env
# Configure database in .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend runs at `http://localhost:8000`

**Frontend**

```bash
cd nextjs
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`

## Environment

**laravel/.env**
```
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**nextjs/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
API_URL=http://localhost:8000/api
```

## Features

- User registration and login
- Create, edit, delete posts
- Post listing with pagination
- Clean responsive UI

## Scripts

**Docker**
```bash
docker-compose up        # Start services
docker-compose down      # Stop services
docker-compose logs -f   # View logs
```

**Backend**
```bash
php artisan serve    # Start server
php artisan migrate  # Run migrations
```

**Frontend**
```bash
npm run dev    # Development
npm run build  # Production build
```
