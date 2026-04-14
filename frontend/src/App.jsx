import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import './styles/App.css';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Student/Dashboard';
import CertificateUpload from './pages/Student/CertificateUpload';
import MyCertificates from './pages/Student/MyCertificates';
import StudentOpportunities from './pages/Student/Opportunities';
import AddOpportunity from './pages/Student/AddOpportunity';
import TPDashboard from './pages/TP/TPDashboard';
import DepartmentInsights from './pages/TP/DepartmentInsights';
import AdminPanel from './pages/Admin/AdminPanel';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <div className="layout">
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                    <div className="layout__main">
                      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                      <div className="layout__content">
                        <Routes>
                          <Route path="dashboard" element={<StudentDashboard />} />
                          <Route path="certificate-upload" element={<CertificateUpload />} />
                          <Route path="certificates" element={<MyCertificates />} />
                          <Route path="opportunities" element={<StudentOpportunities />} />
                          <Route path="add-opportunity" element={<AddOpportunity />} />
                          <Route path="*" element={<Navigate to="dashboard" />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* TP Routes */}
            <Route
              path="/tp/*"
              element={
                <ProtectedRoute allowedRoles={['tp']}>
                  <div className="layout">
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                    <div className="layout__main">
                      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                      <div className="layout__content">
                        <Routes>
                          <Route path="analytics" element={<DepartmentInsights />} />
                          <Route path="dashboard" element={<TPDashboard />} />
                          <Route path="*" element={<Navigate to="dashboard" />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div className="layout">
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                    <div className="layout__main">
                      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                      <div className="layout__content">
                        <Routes>
                          <Route path="dashboard" element={<AdminPanel />} />
                          <Route path="moderate" element={<AdminPanel />} />
                          <Route path="*" element={<Navigate to="dashboard" />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
