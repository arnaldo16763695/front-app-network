import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, HashRouter, Routes } from "react-router-dom";

import Root from "./routes/root";
import Dashboard from "./routes/Dashboard";
import UserManagment from "./routes/users/UserManagment";
import AddUser from "./routes/users/AddUser";

import { Provider } from "react-redux";
import { store } from "./app/store";
import Login from "./components/Login";
import HeadquatersManagment from "./routes/headquaters/HeadquatersManagment";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditUser from "./routes/users/EditUser";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path=""
            element={
              <ProtectedRoutes>
                <Root />
              </ProtectedRoutes>
            }
          >
            <Route path="/home" element={<Dashboard />}></Route>
            <Route path="/users" element={<UserManagment />}></Route>
            <Route path="/add-User" element={<AddUser />}></Route>
            <Route path="/edit-user/:user_id" element={<EditUser />}></Route>
            <Route
              path="/headquaters"
              element={<HeadquatersManagment />}
            ></Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
