import { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import NotFound from './components/NotFound';
import { EditEmployeeChild } from './components/EditEmployeeChild';
import { EditEmployee } from './components/EditEmployee';
import { Home } from './components/Home';
import Register from './components/Register';

import { AuthProvider, useAuth } from "./context/authContext";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children: <Navigate to="/login" />;
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" />: children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectRoute><Home /></ProtectRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/employeelist',
        element: <EmployeeList />
      },
      {
        path: "createemployee",
        element: <CreateEmployee />
      },
      {
        path: "editemployee",
        element: <EditEmployee />,
        children: [
          {
            path: "/editemployee/:id",
            element: <EditEmployeeChild />
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>
  },
  {
    path: "/register",
    element: <PublicRoute><Register /></PublicRoute>
  }
]);

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
