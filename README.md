# 🎓 Smart Campus Opportunity & Skill Insight Platform

A modern, full-stack MERN application designed to track student certifications, facilitate opportunity sharing, and provide data-driven insights to T&P officers.

## 🎯 Key Features

### For Students
- 📜 **Certificate Management** - Upload and track your certifications
- 💼 **Opportunity Discovery** - Find internships, hackathons, and courses with skill matching
- 📊 **Personalized Dashboard** - View your skills and recommendations
- 💬 **Direct Communication** - Message T&P officers with questions
- 🔖 **Smart Bookmarking** - Save opportunities for later

### For T&P Officers
- 📈 **Analytics Dashboard** - View overall skill distribution
- 🏫 **Department-wise Insights** - Analyze skills by department
- ⚠️ **Skill Gap Analysis** - Identify skill deficiencies
- 🎓 **Training Management** - Create and track training programs
- 💬 **Student Communication** - Reply to student queries

### For Admins
- ✅ **Content Moderation** - Approve/reject opportunities
- 🛡️ **Platform Management** - Manage users and content

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB
- JWT Authentication
- CORS enabled

**Frontend:**
- React 18
- Vite
- React Router
- Recharts (for analytics)
- Lucide Icons
- Axios

## 📁 Project Structure

```
Campus_opportunities/
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── hooks/
    │   ├── utils/
    │   ├── styles/
    │   ├── App.jsx
    │   └── index.jsx
    └── package.json
```

## 🚀 Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/campus_opportunities
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will run on `http://localhost:3000`

## 📊 Database Models

- **User** - Student, Admin, T&P Officer
- **Certificate** - Student credentials
- **Opportunity** - Job postings
- **Comment** - Student-TP communication
- **Training** - Training programs
- **Notification** - User notifications

## 🎨 UI/UX Features

- ✨ Modern gradient backgrounds
- 🎭 Card-based UI
- 📱 Fully responsive design
- 🌈 Color-coded badges and alerts
- 📈 Interactive charts and analytics

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API routes

## 📝 Demo Data

The application includes comprehensive demo data for:
- Multiple students from different departments
- Various certificates and skills
- Sample opportunities (internships, hackathons, etc.)
- Department-wise analytics

## 🤝 Contributing

Suggestions and improvements are welcome!

## 📄 License

This project is part of a college hackathon initiative.

---

**Made with ❤️ for Campus Opportunities Management**
