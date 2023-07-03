import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";

const initialForm = {
  name: "",
  state: "",
  city: "",
  address: "",
};
const AddHeadquarter = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [failedmessage, setFailedmessage] = useState({});
  const auth = useSelector((state) => state.auth);
  const url = "http://localhost:8000/api/headquarters/register";
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const api = helpHttp();
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: form,
      })
      .then((res) => {
        if (res.status === 201) {
          setMessage(res.message);
         return setTimeout(() => {
            setMessage("");
            navigate("/headquarters");
          }, 3000);
        }
        if (!res.success) {
          setFailedmessage(Object.entries(res.data));
        return  setTimeout(() => {
            setFailedmessage({});
          }, 6000);
        }
        console.log(res);
      });
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-start">
          <h4>Agregar Sucursales</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            {Object.keys(failedmessage).length > 0 && (
              <div className="alert alert-danger" role="alert">
                {failedmessage.map(([key, value]) => (
                  <ul key={key}>
                    {value.map((el, id) => (
                      <li key={id}>{el}</li>
                    ))}
                  </ul>
                ))}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label fw-bold">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Ingrese el nombre de la sucursal"
                onChange={handleChange}  required
                value={form.name}
                name="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputState" className="form-label fw-bold">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="inputState"
                placeholder="Ingrese en que estado"
                onChange={handleChange}  required
                value={form.state}
                name="state"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputCity" className="form-label fw-bold">
                Ciudad
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                placeholder="Ingrese en que estado"
                onChange={handleChange}  required
                value={form.city}
                name="city"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputAddress" className="form-label fw-bold ">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Ingrese la direccion de la sucursal"
                onChange={handleChange}  required
                value={form.address}
                name="address"
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary me-3"
              value="Guardar"
            />
            <Link
              type="button"
              to={"/headquarters"}
              className="btn btn-warning"
            >
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHeadquarter;
