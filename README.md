# Web Application Assessment Project

A full-stack web application with authentication and post management features, built with Laravel (backend API) and Next.js (frontend).

## Tech Stack

### Backend
- **Laravel 12** - PHP framework for API backend
- **JWT Authentication** (tymon/jwt-auth) - Token-based authentication
- **SQLite** - Lightweight database

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS + DaisyUI** - UI styling and components
- **Axios** - HTTP client for API requests

## Features

✅ **Authentication**
- User registration with validation
- User login with JWT tokens
- Secure logout
- Protected routes

✅ **Post Management (CRUD)**
- List all posts with pagination (10 posts per page)
- View individual post details
- Create new posts
- Edit existing posts (owner only)
- Delete posts (owner only)

✅ **Additional Features**
- Responsive design with DaisyUI components
- User-specific post ownership
- Auto-redirect for authenticated/unauthenticated users
- Clean error handling and validation

## Project Structure

```
assessment-project/
├── laravel/                 # Laravel backend API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   └── PostController.php
│   │   └── Models/
│   │       ├── User.php
│   │       └── Post.php
│   ├── database/
│   │   ├── migrations/
│   │   └── database.sqlite
│   ├── routes/
│   │   └── api.php
│   └── Dockerfile
│
├── nextjs/                  # Next.js frontend
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── posts/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── AuthContext.tsx
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## Installation & Setup

### Prerequisites
- Docker and Docker Compose installed
- Git installed

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
```bash
cd assessment-project
```

2. **Start the application**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

The Laravel container will automatically:
- Install dependencies
- Create SQLite database
- Run migrations
- Generate JWT secret

### Option 2: Manual Setup

#### Laravel Backend Setup

1. **Navigate to Laravel directory**
```bash
cd laravel
```

2. **Install dependencies**
```bash
composer install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` and ensure these settings:
```env
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite
```

4. **Generate application key and JWT secret**
```bash
php artisan key:generate
php artisan jwt:secret
```

5. **Create database and run migrations**
```bash
touch database/database.sqlite
php artisan migrate
```

6. **Start Laravel server**
```bash
php artisan serve
```

Backend will be available at http://localhost:8000

#### Next.js Frontend Setup

1. **Navigate to Next.js directory**
```bash
cd nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

4. **Start development server**
```bash
npm run dev
```

Frontend will be available at http://localhost:3000

## API Endpoints

### Authentication
```
POST   /api/register      - Register new user
POST   /api/login         - Login user
POST   /api/logout        - Logout user (protected)
GET    /api/user          - Get authenticated user (protected)
```

### Posts (All Protected)
```
GET    /api/posts         - List posts with pagination
GET    /api/posts/{id}    - Get single post
POST   /api/posts         - Create new post
PUT    /api/posts/{id}    - Update post (owner only)
DELETE /api/posts/{id}    - Delete post (owner only)
```

## Usage Guide

### 1. Register a New Account
- Navigate to http://localhost:3000
- Click "Register" or go to /register
- Fill in name, email, password (min 6 characters)
- Confirm password
- Click "Sign Up"

### 2. Login
- Click "Login" or go to /login
- Enter email and password
- Click "Sign In"
- You'll be redirected to the posts page

### 3. Create a Post
- Click "Create New Post" button
- Enter title and content
- Click "Create Post"

### 4. View Posts
- All posts are displayed on the /posts page
- Pagination controls appear if more than 10 posts
- Click "View" to see full post details

### 5. Edit/Delete Posts
- You can only edit/delete posts you created
- Click "Edit" to modify your post
- Click "Delete" to remove your post (with confirmation)

### 6. Logout
- Click "Sign Out" in the navigation bar

## Environment Variables

### Laravel (.env)
```env
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=sqlite
DB_DATABASE=/var/www/database/database.sqlite
JWT_SECRET=<generated-secret>
```

### Next.js (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Database Schema

### Users Table
- id (primary key)
- name
- email (unique)
- password (hashed)
- created_at
- updated_at

### Posts Table
- id (primary key)
- user_id (foreign key → users.id)
- title
- content
- created_at
- updated_at

## Technical Decisions

### Backend
- **JWT Authentication**: Stateless authentication ideal for API consumption
- **SQLite**: Simple, file-based database perfect for development and assessment
- **API Resources**: Clean JSON response structure
- **CORS Enabled**: Configured for frontend access

### Frontend
- **App Router**: Next.js 14+ modern routing system
- **Client Components**: Used for interactive features (auth, forms)
- **Context API**: Global auth state management
- **Axios Interceptors**: Automatic JWT token injection and error handling
- **DaisyUI**: Pre-built components for rapid development

## Troubleshooting

### Docker Issues

**Problem**: Containers won't start
```bash
# Remove existing containers and rebuild
docker-compose down
docker-compose up --build --force-recreate
```

**Problem**: Port already in use
```bash
# Check what's using the port
lsof -i :3000  # or :8000
# Kill the process or change ports in docker-compose.yml
```

### Laravel Issues

**Problem**: JWT secret not set
```bash
php artisan jwt:secret
```

**Problem**: Database permission errors
```bash
chmod 777 database/
chmod 666 database/database.sqlite
```

**Problem**: CORS errors
- Ensure CORS middleware is enabled in bootstrap/app.php
- Check frontend is using correct API URL

### Next.js Issues

**Problem**: API calls failing
- Verify `NEXT_PUBLIC_API_URL` in .env.local
- Check Laravel backend is running
- Inspect browser console for errors

**Problem**: Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

## Development Notes

- Laravel uses SQLite, no separate database server needed
- JWT tokens stored in localStorage (frontend)
- All API routes under `/api` prefix
- Protected routes automatically redirect to login if unauthenticated
- Pagination set to 10 posts per page (configurable in PostController)

## Production Considerations

For production deployment, consider:
- Use PostgreSQL or MySQL instead of SQLite
- Enable HTTPS for both frontend and backend
- Store JWT tokens in httpOnly cookies for better security
- Add rate limiting
- Enable proper error logging
- Set up environment-specific configurations
- Use reverse proxy (Nginx) for Laravel
- Deploy Next.js as static export or SSR
- Add proper CORS configuration for production domains

## License

This project was created for assessment purposes.
