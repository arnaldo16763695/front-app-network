import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { Loader } from "../../../components/Loader";

const initialForm = {
  name: "",
  state: "",
  city: "",
  address: "",
};

const EditHeadquarter = () => {
  const { headquarter_id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [failedmessage, setFailedmessage] = useState({});
  const auth = useSelector((state) => state.auth);
  const url = `http://localhost:8000/api/headquarters/${headquarter_id}`;
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  const api = helpHttp();

  useEffect(() => {
    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setLoading(true);
        if (!res.err) {
          setForm(res.data);
        } else {
            setForm({ name: "", state: "", city: "", address: "" });
        }
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
        console.log(res)
        if (res.status === 200) {
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
        <div className="card-header d-flex justify-content-between">
          <h4>Editar Sucursal</h4>
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
                  onChange={handleChange}
                  value={"" || form.name}
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
                  onChange={handleChange}
                  value={"" || form.state}
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
                  onChange={handleChange}
                  value={"" || form.city}
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
                  onChange={handleChange}
                  value={"" || form.address}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHeadquarter;
