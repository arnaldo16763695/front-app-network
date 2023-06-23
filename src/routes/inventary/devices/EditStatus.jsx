import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";

const EditStatus = () => {
  const { idStatus } = useParams();
  const [form, setForm] = useState({
    name: "",
  });
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const url = `http://localhost:8000/api/status/${idStatus}`;
  const navigate = useNavigate();
  const api = helpHttp();
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
        console.log(res, url)
        if (res.status === 200) {
            setMessage(res.message);
           return setTimeout(() => {
              setMessage("");
              navigate("/status-device");
            }, 3000);
          }
          if (res.menssage==='Errores de Validacion') {
            setFailMessage(Object.entries(res.data));
          return  setTimeout(() => {
              setFailMessage({});
            }, 6000);
          }
          console.log(res);
      });
  };

  useEffect(() => {
    helpHttp()
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (res.message === "No hay datos disponibles") {
          setForm([]);
        } else {
          setForm({
            name: res.data.name,
          });
        }

        console.log(res.data);
        console.log(res.data);
      });
  }, [auth.token, url]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card mt-5">
      <div className="card-header d-flex ">
        <h4>Editar status dispositivos</h4>
      </div>
      <div className="card-body">
        {message && <div className="alert alert-success">{message}</div>}
        {failMessage && <div className="alert alert-danger">{failMessage}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Statu de dispositivo
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Ejemplo: En uso"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary me-3"
            value="Guardar"
          />
          <Link type="button" to={"/status-device"} className="btn btn-warning">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditStatus;
