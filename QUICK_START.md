# 🚀 Quick Start Guide

## 1️⃣ INSTALL & RUN

### Backend
```bash
cd backend
npm install
npm run dev
# ✅ Server: http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# ✅ App: http://localhost:3000
```

---

## 2️⃣ TEST ACCOUNTS

### Student
```
📧 Email: student@example.com
🔐 Password: password123
🎓 Department: CSE
```

### T&P Officer
```
📧 Email: tp@example.com
🔐 Password: password123
```

### Admin
```
📧 Email: admin@example.com
🔐 Password: password123
```

---

## 3️⃣ MAIN FEATURES TO TEST

### Student Dashboard
- ✅ View certificates & skills
- ✅ Upload new certificate
- ✅ Browse opportunities with skill matching
- ✅ Bookmark & like opportunities
- ✅ Message T&P officers

### T&P Dashboard
- ✅ View overall skill distribution
- ✅ Department-wise analytics
- ✅ Identify skill gaps
- ✅ View student messages
- ✅ Create training programs

### Admin Panel
- ✅ Approve/reject opportunities
- ✅ Add rejection reasons
- ✅ Moderate content

---

## 4️⃣ KEY PAGES

**Student:**
- `/student/dashboard` - Main dashboard
- `/student/certificates` - My certificates
- `/student/certificate-upload` - Upload certificate
- `/student/opportunities` - Browse opportunities
- `/student/add-opportunity` - Share opportunity

**T&P:**
- `/tp/dashboard` - Main dashboard
- `/tp/analytics` - Department analytics

**Admin:**
- `/admin/dashboard` - Moderation panel

**Auth:**
- `/login` - Sign in
- `/register` - Sign up

---

## 5️⃣ FILE STRUCTURE

```
Campus_opportunities/
├── backend/
│   ├── config/          # Database & constants
│   ├── models/          # 6 database schemas
│   ├── controllers/     # 7 business logic files
│   ├── routes/          # 7 API route files
│   ├── middleware/      # Auth & error handling
│   ├── utils/           # Helpers & validators
│   ├── server.js        # Main server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Global state
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # API & helpers
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx      # Main app
│   │   └── index.jsx    # Entry point
│   └── package.json
├── README.md            # Project overview
├── SETUP.md             # Installation guide
└── PROJECT_SUMMARY.md   # This file
```

---

## 6️⃣ API ENDPOINTS QUICK REF

### Certificates
```
POST   /api/certificates              Upload certificate
GET    /api/certificates/my           Get my certificates
DELETE /api/certificates/:id          Delete certificate
```

### Opportunities
```
GET    /api/opportunities/approved    Get approved opportunities
POST   /api/opportunities             Create opportunity
PUT    /api/opportunities/:id/approve Approve (admin)
PUT    /api/opportunities/:id/reject  Reject (admin)
```

### Analytics
```
GET    /api/analytics/skills          Overall skills
GET    /api/analytics/departments     Department insights
GET    /api/analytics/gaps            Skill gaps
```

### Comments
```
POST   /api/comments                  Create comment
POST   /api/comments/:id/reply        Reply to comment
GET    /api/comments                  Get all comments
```

---

## 7️⃣ COMMON ISSUES & FIXES

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas (update `.env`)

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change `vite.config.js` port

### CORS Error
- Ensure backend runs on port 5000
- Check `vite.config.js` proxy settings

### Module Not Found
- Run `npm install` in both directories
- Delete `node_modules` and `package-lock.json`, then reinstall

---

## 8️⃣ DEPENDENCIES

### Backend
- express, mongoose, jsonwebtoken, bcryptjs
- cors, express-validator

### Frontend
- react, react-router-dom, axios
- recharts (charts), lucide-react (icons)

---

## 9️⃣ SKILLS INCLUDED

Web Development, Python, JavaScript, React, Node.js, MongoDB, AI/ML, 
Data Science, Java, C++, Android, iOS, Cloud, DevOps, UI/UX Design, 
Graphic Design, Digital Marketing

---

## 🔟 DEPARTMENTS

CSE, ECE, EEE, Civil, Mechanical

---

## 📞 SUPPORT

- Check `README.md` for detailed features
- Check `SETUP.md` for installation issues
- Review code comments for clarification

---

## ✅ YOU'RE ALL SET!

Everything is ready to go! 🚀

Start the backend & frontend, then explore the application!

**Happy building! 😊**
