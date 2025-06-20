# 📚 MERN Book Review App

A full-stack MERN application where users can register, login, explore books, write reviews, and manage their profiles. Admin users can manage books via a dashboard.

---

## 🚀 Features

- 🔐 **Authentication** with JWT (Login/Register)
- 📚 **View Books** with search and genre filter
- ✍️ **Write, Edit, Delete Reviews** (only by logged-in users)
- 👤 **User Profile** with personal review history
- 🛠️ **Admin Panel** for adding, editing, deleting books
- 💾 **MongoDB Atlas** cloud database
- 🧼 **Protected Routes** based on user role

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Styling:** Custom CSS

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-book-review-app.git
cd mern-book-review-app


2️⃣ Install Dependencies
npm install      # for frontend
cd backend
npm install      # for backend


3️⃣ Set Up Environment Variables
Create a .env file in the backend folder:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
✅ Make sure .env is listed in .gitignore (already added)

▶️ Run the App
🌐 Backend
cd backend
npm start


💻 Frontend
npm start


📁 Folder Structure (Important Folders)
/client
  └── src
      ├── components
      ├── pages
      ├── context
      ├── App.js
      ├── index.js
/backend
  ├── models
  ├── routes
  ├── controllers
  ├── server.js


🔐 Admin Credentials (For Testing)
Email: admin@example.com
Password: admin123


🧑‍🎓 Developed by
DK Vijendra Kumar
B.Tech – Completed 3rd Year, Entering Final Year
📧 Email: your.email@example.com
🌐 GitHub: your-username

📌 Notes
.env and sensitive configs are not pushed to GitHub

Admin-only routes are protected both on backend and frontend

Responsive layout and clean UI included
