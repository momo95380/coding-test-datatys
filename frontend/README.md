# Frontend Documentation

This React application provides a simple user authentication system with the following routes:

## Routes

### `/login` 
- Login page for existing users
- Allows users to authenticate using email and password
- Redirects to profile page on successful login
- Displays error messages for failed login attempts

### `/register`
- Registration page for new users 
- Collects user information including:
  - Email
  - Password
  - First Name
  - Last Name
  - Country
  - City
  - Phone Number
  - Location
- Redirects to profile page on successful registration
- Displays error messages for failed registration attempts

### `/profile`
- Protected route - requires authentication
- Displays logged in user's information
- Allows users to:
  - View their profile details
  - Update their information
  - Log out of the application
  - Delete their account

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes check for valid token
- Unauthorized users are redirected to login page
- AuthContext provides authentication state throughout the app

