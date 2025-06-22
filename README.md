# 📇 PulkeMovies API

A full-featured RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing users and handle a movies site.

---

## 🚀 Features

### 👤 User Management

- ✅ Create a new user (only if the user does not already exist)
- 🔐 Login with encrypted password
- 🔒 Lock user for 24 hours after 3 failed login attempts
- ✏️ Edit user information
- 🗑️ Admin can delete any user
- 📋 Admin can retrieve a list of all users

### 💼 Business Card Management

- ➕ Create a new movie (creators)
- ✏️ Edit an existing movie (creator)
- ❌ Delete a movie (only if you are the owner or an admin)
- ❤️ Like or unlike a movie (registerd)

---

## 📁 API Routes

### 👤 Users - `/api/users`

| Method | Route              | Description                                      |
|--------|--------------------|--------------------------------------------------|
| POST   | `/`                | Create a new user                                |
| POST   | `/login`           | Login an existing user                           |
| GET    | `/:id`             | Get user details by ID                           |
| PUT    | `/:id`             | Update user information                          |
| DELETE | `/:id`             | Delete a user (admin only)                       |
| GET    | `/`                | Get all users (admin only)                       |

---

### 💼 Movies - `/api/movies`

| Method | Route                       | Description                                            |
|--------|-----------------------------|--------------------------------------------------------|
| POST   | `/`                         | Create a new movie                         |
| GET    | `/`                         | Retrieve all movie cards                           |
| GET    | `/:id`                      | Get a specific movie by ID                             |
| PUT    | `/:id`                      | Edit a movie card                                  |
| DELETE | `/:id`                      | Delete a movie (if you are the owner or an admin)      |
| PATCH  | `/:id/like`                 | Like or unlike a card                                 |

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Custom middleware** for authorization and role-based access control
- **Cloudinary** storing users/movies images

---

## 🔧 Getting Started

### 1. Clone the repository






```bash
git clone https://github.com/DavidPulke/final-server.git
cd final-server

```

### 2. Download all the packages

```bash
npm install 
```

### 3. Create .env file which includes the following

- Connection string 
- Port
- JWTKEY


🙋‍♂️ Author
Made with ❤️ by David Polak

If you like this project, give it a ⭐️ on GitHub – it really helps!
