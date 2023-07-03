import { useState } from "react";
import Swal from "sweetalert2";

import { helpHttp } from "../../helpers/helpHttp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeAuth } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
const userName = getCookie("userName");
const rolName = getCookie("roleName");
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState({});
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const auth = useSelector((state) => state.auth);
  const url = `http://localhost:8000/api/auth/changePassword`;
  const changePass = (data) => {
    helpHttp()
      .post(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: data,
      })
      .then((res) => {
        console.log(res);
        if (!res.err) {
          if (res.status === 200) {
            setSuccessMessage(res.message);
            return setTimeout(() => {
              setSuccessMessage("");
              logout()
              navigate("/");
            }, 2000);
          }

          if (res.message === "Errores de Validacion") {
            setFailedMessage(Object.entries(res.data));
            return setTimeout(() => {
              setFailedMessage("");
            }, 6000);
          }
        } else {
          console.log(res.statusText);
        }
      });
  };

  const logout = () => {
    // localStorage.removeItem("tokenNetwork");
    // localStorage.removeItem("roleId");
    // localStorage.removeItem("userName");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "roleName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "roleId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(removeAuth());
    logoutSession();
    navigate("/login");
  };

  // logout in backend
  const logoutSession = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/auth/logout`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const json = await res.json();
      console.log(json);

      if (!res.ok) throw { statusText: res.statusText, status: res.status };
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (pass.trim() !== pass2.trim()) {
      return Swal.fire("Lo siento...", "Las contraseñas no coinciden", "error");
    }
    const data = {
      new_password: pass,
    };
    changePass(data);
    console.log(data);
  };

  

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Perfil de: {userName} </h4>
          <h4>Rol: {rolName} </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} autoComplete="off">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {Object.keys(failedMessage).length > 0 && (
              <div className="alert alert-danger" role="alert">
                {failedMessage.map(([key, value]) => (
                  <ul key={key}>
                    {value.map((el, id) => (
                      <li key={id}>{el}</li>
                    ))}
                  </ul>
                ))}
              </div>
            )}

            <p><i><strong>Si lo desea puede cambiar aquí su contraseña</strong></i></p>

            <div className="mb-3">
              <label htmlFor="inputPass" className="form-label">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPass "
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                name="pass"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPass2" className="form-label">
                Repita contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPass2"
                rows="3"
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
                name="pass2"
                required
              ></input>
            </div>
            <input
              type="submit"
              className="btn btn-primary me-3"
              value="Guardar"
            />
            <Link type="button" to={"/"} className="btn btn-warning">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
