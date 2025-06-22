# 🎬 PulkeMovies API

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
| POST   | `/`                | Register a new user                              |
| POST   | `/login`           | Login and get JWT                                |
| GET    | `/:id`             | Get user details by ID                           |
| PUT    | `/:id`             | Update user information                          |
| DELETE | `/:id`             | Delete user (admin only)                         |
| GET    | `/`                | Get all users (admin only)                       |

---

### 🎬 Movies - `/api/movies`

| Method | Route            | Description                                            |
|--------|------------------|--------------------------------------------------------|
| POST   | `/`              | Create a new movie (creators only)                    |
| GET    | `/`              | Retrieve all movies                                   |
| GET    | `/:id`           | Get a movie by ID                                     |
| PUT    | `/:id`           | Edit movie (owner or admin)                           |
| DELETE | `/:id`           | Delete movie (owner or admin)                         |
| PATCH  | `/:id/like`      | Like or unlike a movie (logged-in users)              |

---

### 💬 Chat - `/api/messages` & `/api/chat`

| Method | Route                         | Description                                        |
|--------|-------------------------------|----------------------------------------------------|
| POST   | `/api/messages`               | Send message to admin (authenticated users only)   |
| GET    | `/api/messages`               | Get your messages                                  |
| GET    | `/api/chat/users`             | Get users who messaged the admin (admin only)      |
| GET    | `/api/chat/:userId/messages`  | Get chat with specific user (admin only)           |

---

## 🛠️ Technologies Used

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for secure auth
- **Bcrypt.js** for password hashing
- **Cloudinary** for image uploads
- **Custom Middleware** for roles & validation
- **TMDB API** for seeding movie data

 ---
 
## 🗃️ Folder Structure

final-server/

├── models/          # Mongoose schemas (User, Movie, Message)

├── routes/          # API route handlers

├── middlewares/     # Auth, validation & error handling

├── services/        # Optional services/helpers

├── utils/           # Utility functions (like formatting time)

├── index.js         # App entry point

└── .env             # Environment variables

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
- Cloudinary url
- TMDB api key


🙋‍♂️ Author
Made with ❤️ by David Polak

If you like this project, give it a ⭐️ on GitHub – it really helps!
](https://github.com/DavidPulke/final-server)
