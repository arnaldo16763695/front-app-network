import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChangePassword = () => {
  const { user_id } = useParams();
  const auth = useSelector((state) => state.auth);
  const url_user = `http://localhost:8000/api/user/${user_id}`;
  const [dataUser, setDataUser] = useState({});
  const [pass, setPass] = useState({});
  const [pass2, setPass2] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState({});
  const navigate = useNavigate();

  const getUser = async (url_user) => {
    try {
      const res = await fetch(url_user, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }),
        user = await res.json();
      setDataUser(user.data);
      console.log(dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  const changePass = async (datos) => {
    try {
      const res = await fetch(`http://localhost:8000/api/auth/resetPassword`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(datos),
      });
      const json = await res.json();

      if (json.message === "Errores de Validacion") {
        setFailMessage(Object.entries(json.data));
        setTimeout(() => {
          setFailMessage({});
        }, 6000);
        console.log(Object.entries(json.data));
      }

      console.log(json.message);
    //   setSuccessMessage(json.message);
    //   setTimeout(() => {
    //     setSuccessMessage("");
    //     navigate(`/users`);
    //   }, 3000);
    if (json.message === "Contraseña restablecida correctamente") {
        setSuccessMessage(json.message);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/users");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(url_user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pass || !pass2) {
      return alert("Llena todos los campos");
    }

    if (pass !== pass2) {
      return alert("Las contraseñas no coinciden");
    }
    const datos = {
      email: dataUser?.email,
      new_password: pass,
    };
    console.log(datos);
    changePass(datos);
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Cambiar contraseña de: {dataUser?.name}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {Object.keys(failMessage).length > 0 && (
              <div className="alert alert-danger" role="alert">
                {failMessage.map(([key, value]) => (
                  <ul key={key}>
                    {value.map((el, id) => (
                      <li key={id}>{el}</li>
                    ))}
                  </ul>
                ))}
              </div>
            )}
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="inputPhone" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  rows="3"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  name="password"
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPhone" className="form-label">
                  Repita contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  rows="3"
                  onChange={(e) => setPass2(e.target.value)}
                  value={pass2}
                  name="password2"
                ></input>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary me-3"
              value="Guardar"
            />
            <Link type="button" to={"/users"} className="btn btn-warning">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
