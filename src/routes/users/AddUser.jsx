import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const url = `http://localhost:8000/api/auth/register`;
const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role_id: "",
};
const AddUser = () => {
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState(initialForm);
  const [rols, setRols] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState({});
  const navigate = useNavigate();

  const addUser = async (form) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      console.log(json.message);
      if (json.message === "Registro creado") {
        setSuccessMessage(json.message);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/users");
        }, 3000);
      }
      if (json.message === "Errores de Validacion") {
        setFailMessage(Object.entries(json.data));
        setTimeout(() => {
          setFailMessage({});
         
        }, 6000);
        console.log(Object.entries(json.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if (
      !form.email.trim() ||
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.password.trim()
    ) {
      alert("Datos incompletos");
      return;
    }

    addUser(form);
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
  useEffect(() => {
    getRols();
  }, []);

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Crear Usuario</h4>
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
              <label htmlFor="inputCorreo" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="name@example.com"
                onChange={handleChange}
                value={form.email}
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
                onChange={handleChange}
                value={form.name}
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
                onChange={handleChange}
                value={form.phone}
                name="phone"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                rows="3"
                onChange={handleChange}
                value={form.password}
                name="password"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Rol
              </label>
              <select
                name="role_id"
                className="form-select"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option value="">Elija un rol ..</option>
                {Object.keys(rols).length > 0 &&
                  rols.roles.map((rol) => (
                    <option value={rol.id} key={rol.id}>
                      {rol.name}
                    </option>
                  ))}
              </select>
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
        </div>
      </div>
    </div>
  );
};

export default AddUser;
