# Backend API Server

A Node.js + Express backend server with Supabase database integration.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your actual Supabase credentials
   ```

3. **Configure your `.env` file:**
   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

### Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**

### Database Setup

Create a `users` table in your Supabase database:

```sql
-- Create users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true);
```

## 🏃‍♂️ Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001` (or the PORT specified in your .env file).

## 📡 API Endpoints

All endpoints return consistent JSON responses with `success`, `message`, and `data` fields.

### Health Check
- **GET** `/health` or `/api/health`
- **Response:** 
  ```json
  {
    "success": true,
    "message": "Server is healthy",
    "data": {
      "status": "ok",
      "timestamp": "2023-...",
      "uptime": 123.45,
      "environment": "development"
    }
  }
  ```

### System Status
- **GET** `/health/status` or `/api/health/status`
- **Response:** Detailed system information including memory usage, platform, etc.

### API Info
- **GET** `/` or `/api/`
- **Response:** API welcome message with available endpoints

### User Management

#### Create User
- **POST** `/users` or `/api/users`
- **Body:** 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response:** 
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2023-..."
      }
    }
  }
  ```

#### Get All Users
- **GET** `/users` or `/api/users`
- **Response:** 
  ```json
  {
    "success": true,
    "message": "Users fetched successfully",
    "data": {
      "users": [...],
      "count": 5
    }
  }
  ```

#### Get User by ID
- **GET** `/users/:id` or `/api/users/:id`
- **Response:** Single user object or 404 if not found

#### Update User
- **PUT** `/users/:id` or `/api/users/:id`
- **Body:** Fields to update (name and/or email)
- **Response:** Updated user object

#### Delete User
- **DELETE** `/users/:id` or `/api/users/:id`
- **Response:** Confirmation of deletion

## 🧪 Testing the API

You can test the API using curl, Postman, or any HTTP client:

### Test Health Check
```bash
curl http://localhost:3001/health
```

### Create a User
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Get All Users
```bash
curl http://localhost:3001/users
```

## 📁 Project Structure

```
backend/
├── config/             # Configuration files
│   ├── database.js     # Supabase client configuration
│   └── server.js       # Server configuration
├── controllers/        # Business logic controllers
│   ├── healthController.js  # Health check endpoints
│   └── userController.js    # User-related business logic
├── middleware/         # Custom middleware
│   ├── cors.js         # CORS configuration
│   ├── errorHandler.js # Global error handling
│   ├── notFound.js     # 404 handler
│   ├── requestLogger.js # Request logging
│   └── index.js        # Middleware exports
├── models/             # Data models and database operations
│   └── User.js         # User model with CRUD operations
├── routes/             # API route definitions
│   ├── healthRoutes.js # Health check routes
│   ├── userRoutes.js   # User API routes
│   └── index.js        # Main route configuration
├── server.js           # Main Express server entry point
├── package.json        # Dependencies and scripts
├── .gitignore         # Git ignore rules
├── env.example        # Environment variables template
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |

### CORS

The server is configured with CORS enabled for all origins. In production, you should configure this to only allow your frontend domain.

## 🚨 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env` file exists and contains the correct Supabase credentials

2. **Database connection errors**
   - Verify your Supabase URL and key are correct
   - Check that your Supabase project is active
   - Ensure the `users` table exists in your database

3. **Port already in use**
   - Change the PORT in your `.env` file
   - Or kill the process using the port: `npx kill-port 3001`

### Logs

The server logs important information to the console. Check the terminal output for error messages and debugging information.

## 🔐 Security Notes

- The current setup uses the Supabase anonymous key, which is safe for client-side use
- In production, consider implementing proper authentication and authorization
- Review and configure Row Level Security (RLS) policies in Supabase
- Use environment variables for all sensitive configuration

## 📚 Next Steps

- Add authentication (JWT, OAuth, etc.)
- Implement input validation and sanitization
- Add rate limiting
- Set up logging and monitoring
- Add unit and integration tests
- Configure production deployment
