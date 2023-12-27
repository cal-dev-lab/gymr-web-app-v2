import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import App from './App';
import WorkoutsHome from './pages/workout-tracker/workout';
import axios from "axios";
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from '../context/userContext';
import GroupSettings from './pages/settings/groups';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/workout/:id",
    element: <WorkoutsHome />,
  },
  {
    path: "/settings/groups",
    element: <GroupSettings />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);