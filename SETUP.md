# Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file in the backend folder:
```
MONGODB_URI=mongodb://localhost:27017/campus_opportunities
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
NODE_ENV=development
```

### 3. Start MongoDB
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Run Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

App will run on `http://localhost:3000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Certificates
- `POST /api/certificates` - Upload certificate (Student)
- `GET /api/certificates/my` - Get my certificates (Student)
- `DELETE /api/certificates/:id` - Delete certificate (Student)
- `GET /api/certificates` - Get all certificates (Admin/TP)

### Opportunities
- `POST /api/opportunities` - Create opportunity (Student)
- `GET /api/opportunities/approved` - Get approved opportunities
- `GET /api/opportunities/pending` - Get pending opportunities (Admin)
- `PUT /api/opportunities/:id/approve` - Approve opportunity (Admin)
- `PUT /api/opportunities/:id/reject` - Reject opportunity (Admin)
- `PUT /api/opportunities/:id/bookmark` - Bookmark opportunity (Student)
- `PUT /api/opportunities/:id/like` - Like opportunity (Student)

### Analytics
- `GET /api/analytics/skills` - Overall skill distribution (TP)
- `GET /api/analytics/departments` - Department insights (TP)
- `GET /api/analytics/gaps` - Skill gap analysis (TP)
- `GET /api/analytics/trends` - Trending skills (TP)

### Comments
- `POST /api/comments` - Create comment (Student)
- `POST /api/comments/:commentId/reply` - Reply to comment (TP)
- `GET /api/comments` - Get all comments (TP)
- `GET /api/comments/student` - Get my comments (Student)

### Training
- `POST /api/trainings` - Create training (TP)
- `GET /api/trainings` - Get trainings
- `POST /api/trainings/:trainingId/register` - Register for training (Student)

## Test Credentials

### Student
- Email: student@example.com
- Password: password123
- Department: CSE

### Admin
- Email: admin@example.com
- Password: password123

### TP Officer
- Email: tp@example.com
- Password: password123

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env

### Port Already in Use
- Change PORT in .env or backend
- Change port in vite.config.js for frontend

### CORS Issues
- Ensure backend is running on 5000
- Check proxy in vite.config.js

## Production Build

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
- Set NODE_ENV=production
- Use a MongoDB Atlas connection
- Deploy on Heroku, AWS, or similar platform

---

For more details, see README.md
