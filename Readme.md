# Todo SaaS

A full-stack Todo SaaS application built with Laravel REST API and React.

## Projects

| Project | Tech | Description |
|---|---|---|
| `todo-saas-api` | Laravel 10 + Sanctum | REST API backend |
| `todo-saas-web` | React + Vite | Frontend SPA |

## Features

- User Authentication (Register/Login)
- Create, Update, Delete Todos
- Filter by Status, Priority, Due Date
- Dashboard with Stats
- Multi-user Support

## Tech Stack

- **Backend:** Laravel 10, MySQL, Sanctum
- **Frontend:** React, Vite, Zustand, Axios
- **Auth:** Laravel Sanctum (Token Based)

## Getting Started

### Requirements
- PHP 8.1+
- Composer
- Node.js 20+
- MySQL

### Setup API
```bash
cd todo-saas-api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Setup Web
```bash
cd todo-saas-web
npm install
npm run dev
```

## Author

**Sajedul Islam Fahim**  
GitHub: [@Sajedul-Islam-Fahim](https://github.com/Sajedul-Islam-Fahim)
