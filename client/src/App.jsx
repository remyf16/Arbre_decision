import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AdminLayout from './components/dashboard/AdminLayout';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DecisionTreeEditor from './components/DecisionTreeEditor';
import DecisionTreeViewer from './components/DecisionTreeViewer';
import UserManagement from './components/dashboard/UserManagement';
import Settings from './components/dashboard/Settings';
import TreeResults from './components/dashboard/TreeResults';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const DashboardLayout = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tree/:id" element={<DecisionTreeViewer />} />

        <Route
          path="/"
          element={<PrivateRoute><DashboardLayout /></PrivateRoute>}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="editor/:id" element={<DecisionTreeEditor />} />
          <Route path="results/:treeId" element={<TreeResults />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
