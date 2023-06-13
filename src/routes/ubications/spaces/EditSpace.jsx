import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { Loader } from "../../../components/Loader";

const initialForm = {
  name: "",
  observation: "",
  headquarter_id: "",
};
const EditSpace = () => {
  const navigate = useNavigate();
  const { space_id } = useParams();
  const url = `http://localhost:8000/api/locations/${space_id}`;
  const urlHeadquarters = `http://localhost:8000/api/headquarters`;
  const api = helpHttp();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState(null);
  const [headquarters, setHeadquarters] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    //console.log(form)
    e.preventDefault();
    api
      .put(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: form,
      })
      .then((res) => {
        //console.log(res);
        if (res.status === 201) {
          setMessage(res.message);
          return setTimeout(() => {
            setMessage("");
            navigate("/spaces");
          }, 3000);
        }
        if (!res.success) {
          setFailedMessage(Object.entries(res.data));
          return setTimeout(() => {
            setFailedMessage(null);
          }, 6000);
        }
        //console.log(res);
      });
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setLoading(true)
    helpHttp()
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
       
        if (!res.err) {
          setForm({
            name: res.data.name,
            observation: res.data.observation,
            headquarter_id: res.data.headquarter.id,
          });
        } else {
          setForm({ name: "", observation: "", headquarter_id: "" });
        }
        setLoading(false);
        //console.log(res.data);
      });
  }, [url, auth.token]);

  useEffect(() => {
    helpHttp()
      .get(urlHeadquarters, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (!res.err) {
          setHeadquarters(res.data);
        } else {
          setHeadquarters([]);
        }
      });
  }, [auth.token, urlHeadquarters]);

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Agregar Espacios</h4>
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
              {failedMessage && (
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
                  value={"" || form.name}
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
                  value={"" || form.headquarter_id}
                  id="headquarter_id"
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
                  value={"" || form.observation}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSpace;
