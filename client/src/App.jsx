import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/dashboard/AdminLayout';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DecisionTreeEditor from './components/DecisionTreeEditor';
import DecisionTreeViewer from './components/DecisionTreeViewer';
import UserManagement from './components/dashboard/UserManagement';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tree/:id" element={<DecisionTreeViewer />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <PrivateRoute>
              <DecisionTreeEditor />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
