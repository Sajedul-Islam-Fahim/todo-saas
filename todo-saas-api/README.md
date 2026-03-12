# Todo SaaS API

REST API backend for Todo SaaS built with Laravel 10 and Sanctum.

## Tech Stack

- **Framework:** Laravel 10
- **PHP:** 8.1+
- **Database:** MySQL
- **Authentication:** Laravel Sanctum (Token Based)

## Requirements

- PHP 8.1+
- Composer
- MySQL

## Installation
```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

## Environment Variables
```env
APP_NAME=TodoSaasAPI
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_saas
DB_USERNAME=root
DB_PASSWORD=your_password
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |
| POST | `/api/logout` | Logout user |
| GET | `/api/me` | Get current user |

### Todos
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Get dashboard stats |

## Author

**Sajedul Islam Fahim**  
GitHub: [@Sajedul-Islam-Fahim](https://github.com/Sajedul-Islam-Fahim)
