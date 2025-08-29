 JWT Auth App
A simple JWT-based authentication system using React for the frontend and Node.js + Express + MongoDB for the backend.  
This project demonstrates signup, login, protected routes, and token-based authentication.

 Features
Signup: Register a new user with username and password (password is hashed using bcrypt).  
 Login: Authenticate an existing user and receive a JWT token.  
 Protected Profile Page: Accessible only with a valid JWT token.  
 Logout: Clears the JWT token and redirects to login.  
 Token Storage: JWT token stored in `localStorage` for session management.  

 Tech Stack
 Frontend: React, Vite, React Router  
 Backend: Node.js, Express  
 Database: MongoDB (using Mongoose)  
 Authentication: JWT (JSON Web Tokens)  
 Password Security: bcrypt  

