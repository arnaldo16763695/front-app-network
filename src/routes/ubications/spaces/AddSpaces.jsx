import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";

const initialForm = {
  name: "",
  observation: "",
  headquarter_id: "",
};
const AddSpaces = () => {
  const navigate = useNavigate();
  const url = `http://localhost:8000/api/headquarters`;
  const urlpost = `http://localhost:8000/api/locations/register`;
  const api = helpHttp();
  const [form, setForm] = useState(initialForm);
  const [headquarters, setHeadquaters] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [failedMessage2, setFailedMessage2] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    api
      .post(urlpost, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: form,
      })
      .then((res) => {
        console.log(res)
        if (!res.err) {
          if (res.status === 201) {
            setMessage(res.message);
           return setTimeout(() => {
              setMessage("");
              navigate("/spaces");
            }, 3000);
          }
          if (res.status === 200) {
            setFailedMessage2(res.message);
           return setTimeout(() => {
            setFailedMessage2("/spaces");("");
              
            }, 6000);
          }
          if (res.message==="Errores de Validacion"){
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

  useEffect(() => {
    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (!res.err) {
          setHeadquaters(res.data);
        } else {
          setHeadquaters([]);
        }
      });
  }, []);

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Agregar Espacios</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
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

            {
              failedMessage2 && <div className="alert alert-danger" role="alert">
                {failedMessage2}
              </div>
            }
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label fw-bold">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Ingrese el nombre del espacio"
                name="name"
                onChange={handleChange}
                value={form.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label fw-bold">
                Sucursal
              </label>
              <select
                className="form-control"
                name="headquarter_id"
                onChange={handleChange}
              >
                <option value={""}>Elija la sucursal...</option>
                {headquarters.length &&
                  headquarters.map((headquarter) => (
                    <option key={headquarter.id} value={headquarter.id}>
                      {headquarter.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label fw-bold">
                Observaciones
              </label>
              <input
                type="text"
                className="form-control"
                id="inputObservation"
                placeholder="Ingrese el nombre del espacio"
                name="observation"
                onChange={handleChange}
                value={form.observations}
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary me-3"
              value="Guardar"
            />
            <Link type="button" to={"/spaces"} className="btn btn-warning">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSpaces;
