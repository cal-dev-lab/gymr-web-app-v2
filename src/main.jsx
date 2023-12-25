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
import CreateGroup from './pages/settings/create-group';

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
    path: "/settings/create-group",
    element: <CreateGroup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);