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
import HeadquatersManagment from "./routes/ubications/headquaters/HeadquatersManagment";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditUser from "./routes/users/EditUser";
import ChangePassword from "./routes/users/ChangePassword";
import Spaces from "./routes/ubications/spaces/Spaces";
import AddHeadquarter from "./routes/ubications/headquaters/addHeadquarter";
import EditHeadquarter from "./routes/ubications/headquaters/EditHeadquarter";
import AddSpaces from "./routes/ubications/spaces/AddSpaces";
import EditSpace from "./routes/ubications/spaces/EditSpace";
import AddDevice from "./routes/inventary/devices/AddDevice";
import DevicesManagment from "./routes/inventary/devices/DevicesManagment";
import EditDevice from "./routes/inventary/devices/EditDevice";
import TypesDevices from "./routes/inventary/devices/TypesDevices";
import StatusDevices from "./routes/inventary/devices/StatusDevices";
import AddStatus from "./routes/inventary/devices/AddStatus";
import AddTypes from "./routes/inventary/devices/addTypes";
import EditStatus from "./routes/inventary/devices/EditStatus";
import EditTypes from "./routes/inventary/devices/EditTypes";
import Profile from "./routes/users/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Root />
              </ProtectedRoutes>
            }
          >
            <Route index="/home" element={<Dashboard />}></Route>
            <Route path="/users" element={<UserManagment />}></Route>
            <Route path="/add-User" element={<AddUser />}></Route>
            <Route path="/edit-user/:user_id" element={<EditUser />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/devices" element={<DevicesManagment />}></Route>
            <Route path="/spaces" element={<Spaces />}></Route>
            <Route path="/add-headquarter" element={<AddHeadquarter />}></Route>
            <Route
              path="/edit-headquarter/:headquarter_id"
              element={<EditHeadquarter />}
            ></Route>
            <Route path="/add-space" element={<AddSpaces />}></Route>
            <Route path="/edit-space/:space_id" element={<EditSpace />}></Route>
            <Route path="/add-device" element={<AddDevice />}></Route>
            <Route
              path="/edit-device/:idDevice"
              element={<EditDevice />}
            ></Route>
            <Route path="/types-device" element={<TypesDevices />}></Route>
            <Route path="/status-device" element={<StatusDevices />}></Route>
            <Route path="/add-status-devices" element={<AddStatus />}></Route>
            <Route path="/add-types-devices" element={<AddTypes />}></Route>
            <Route
              path="/edit-status/:idStatus"
              element={<EditStatus />}
            ></Route>
            <Route path="/edit-types/:idType" element={<EditTypes />}></Route>
            <Route
              path="/change-pass/:user_id"
              element={<ChangePassword />}
            ></Route>
            <Route
              path="/headquarters"
              element={<HeadquatersManagment />}
            ></Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
