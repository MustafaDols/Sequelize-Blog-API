# Sequelize-Blog-API

A RESTful API for managing a blog with users, posts, and comments, built using **Node.js**, **Express**, and **Sequelize**. This API supports CRUD operations and utilizes a relational database for data storage.

---

## 📚 Features

### ✅ User APIs
- **POST /users/signup**: Register new users with validations.
- **PUT /users/:id**: Update or create user by ID (skip validation).
- **GET /users/by-email**: Find user by email.
- **GET /users/:id**: Retrieve user by ID (excluding role).

### 📝 Post APIs
- **POST /posts**: Create new post.
- **DELETE /posts/:postId**: Delete post (owner only).
- **GET /posts/details**: Get posts with user and comment details.
- **GET /posts/comment-count**: Get posts with comment counts.

### 💬 Comment APIs
- **POST /comments**: Bulk create comments.
- **PATCH /comments/:commentId**: Update comment (owner only).
- **POST /comments/find-or-create**: Find or create comment.
- **GET /comments/search?word=the**: Search comments by word.
- **GET /comments/newest/:postId**: Get 3 most recent comments for post.
- **GET /comments/details/:id**: Get comment by ID with user and post.

---

## 🛠️ Technologies
- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MySQL**

---

## ✅ Validations
- **Email format validation** (built-in).
- **Custom password length check** (password > 6 characters).
- **Name length validation** (using beforeCreate hook > 2 characters).
- **Soft delete (paranoid mode)** for posts.

---

## 🧪 Postman Collection
You can test all the API endpoints using the Postman collection:

👉 [Click here to access the Postman collection](https://documenter.getpostman.com/view/45585304/2sB34hGLL2)
