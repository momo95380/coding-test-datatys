# Datatys API Documentation

## Setup Instructions
- Clone the repository and create new branch
- [Install Docker Compose](https://docs.docker.com/compose/install/)
- Copy the .env.example (backend/frontend) file into a new .env file
- Run backend/ `npm install`
- Run backend/ `npm run docker:up`
- Run frontend/ `npm install`
- Run frontend/ `npm run start`
- Run backend/ test `npm run test`

## API Routes

### Authentication
- `POST /auth` - User login
  - Body: `{ email: string, password: string }`
  - Returns: `{ user: Object, token: string }`

- `POST /register` - Register new user
  - Body: `{ email: string, password: string, firstName: string, lastName: string, country: string, city: string, phoneNumber: string, location: string }`
  - Returns: `{ user: Object, token: string }`

### Users
- `GET /users/me` - Get current user profile
  - Requires authentication
  - Returns: User object with profile details

- `PUT /users/me` - Update user profile
  - Requires authentication
  - Body: User fields to update
  - Returns: Updated user object

- `DELETE /users/me` - Delete user account
  - Requires authentication
  - Returns: Success message

### Authentication
All protected routes require a valid JWT token in the Authorization header.

### Error Responses
- 401 Unauthorized - Invalid/missing token
- 400 Bad Request - Invalid input
- 404 Not Found - Resource not found

### Database
Use db functions in `backend/sql/db.js` to communicate with PostgreSQL database.