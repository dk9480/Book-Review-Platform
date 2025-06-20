# 📚 MERN Book Review App

A full-stack MERN application where users can register, login, explore books, write reviews, and manage their profiles.  
**Admin users** can manage books via a dashboard.

---

## 🚀 Features

- 🔐 **Authentication** with JWT (Login/Register)
- 📚 **Browse Books** with search and genre filter
- ✍️ **Write, Edit, Delete Reviews** (only by logged-in users)
- 👤 **User Profile** with personal review history
- 🛠️ **Admin Panel** to manage books (Add/Edit/Delete)
- 💾 **MongoDB Atlas** cloud database
- 🧼 **Protected Routes** based on user role (User/Admin)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Custom CSS

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/My-USERNAME/mern-book-review-app.git
cd mern-book-review-app


2️⃣ Install Dependencies
# Frontend
  - npm install

# Backend
  - cd backend
  - npm install


3️⃣ Set Up Environment Variables
Create a .env file inside the /backend folder:
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- PORT=5000
✅ .env is already included in .gitignore


▶️ Run the App
🌐 Backend
   - cd backend
   - npm run dev


💻 Frontend
   - npm start


📁 Folder Structure
/client
  └── src
      ├── components
      ├── pages
      ├── context
      ├── App.js
      └── index.js

/backend
  ├── models
  ├── routes
  ├── controllers
  └── server.js


🔐 Admin Credentials (For Testing)
   - Email: admin@example.com
   - Password: admin123

🧑‍🎓 Developed By
DK Vijendra Kumar
B.Tech – Completed 3rd Year, Entering Final Year
🌐 GitHub: https://github.com/dk9480

## 📌 Notes
- Sensitive `.env` configuration is not pushed to GitHub
- Admin routes are protected (role-based access)
- UI is clean and partially responsive

