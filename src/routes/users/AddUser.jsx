import { Link } from "react-router-dom";
import { useState } from "react";
const url = `http://localhost:8000/api/auth/register`;
const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
};
const AddUser = () => {
  const [form, setForm] = useState(initialForm);
  const addUser = async (form) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: form,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    
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
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Crear Usuario</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                className="form-select"
                aria-label="Default select example"
              >
                <option>-------</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
              </select>
            </div>

            <input
              type="submit"
              value="Guardar"
              className="btn btn-primary me-3"
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
