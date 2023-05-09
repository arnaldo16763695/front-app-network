import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root'
import Dashboard from './routes/Dashboard';
import UserManagment from './routes/users/UserManagment';
import AddUser from './routes/users/AddUser';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UserManagment/>,
      },
      {
        path: "add-user",
        element: <AddUser/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
