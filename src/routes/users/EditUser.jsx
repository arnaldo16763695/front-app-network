import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  role_id: "",
};
const EditUser = () => {

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
  const idRol = getCookie("roleId");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState(initialForm);
  const [rols, setRols] = useState("");
  const { user_id } = useParams();
  const [message, setMessage] = useState("");
  const url_user = `http://localhost:8000/api/user/${user_id}`;
  const [loading, setLoading] = useState(false);
  //  console.log(form)
  const updateUser = async (form) => {
    try {
      const res = await fetch(url_user, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      console.log(json);
      setMessage(json.message);
      setTimeout(() => {
        setMessage("");
        navigate("/users");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!form.email.trim() || !form.name.trim() || !form.phone.trim()) {
    //   alert("Datos incompletos");
    //   return;
    // }

    updateUser(form);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const getRols = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/roles", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }),
        rols = await res.json();
      console.log(rols);
      setRols(rols);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(url_user, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }),
        user = await res.json();
      console.log(user.data.roles[0].id);
      setLoading(false);
      setForm({
        name: user.data.name,
        email: user.data.email,
        phone: user.data.phone,
        role_id: user.data.roles[0].id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRols();
    getUser();
  }, []);

  //  console.log(form)
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Editar Usuario</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit}>
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="inputCorreo" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputCorreo"
                  placeholder="name@example.com"
                  onChange={handleChange} required
                  value={form.email || ""}
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  rows="3"
                  onChange={handleChange} required
                  value={form.name || ""}
                  name="name"
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPhone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="inputPhone"
                  rows="3"
                  onChange={handleChange} required
                  value={form.phone || ""}
                  name="phone"
                ></input>
              </div>

              <div className="mb-3">
                {
                  idRol !== '2' &&
                  <>
                    <label htmlFor="inputPhone" className="form-label">
                      Rol
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="role_id"
                      onChange={handleChange} required
                      value={form.role_id || ""}
                    >
                      {Object.keys(rols).length > 0 &&
                        rols.roles.map((rol) => (
                          <option value={rol.id} key={rol.id}>
                            {rol.name}
                          </option>
                        ))}
                    </select>
                  </>
                }
              </div>

              {/* <input
              type="submit"
              value="Guardar"
              className="btn btn-primary me-3"
            /> */}

              <input
                type="submit"
                className="btn btn-primary me-3"
                value="Guardar"
              />
              <Link type="button" to={"/users"} className="btn btn-warning">
                Cancelar
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
