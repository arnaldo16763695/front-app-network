import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";

const AddStatus = () => {
  const [name, setName] = useState("");
  const auth = useSelector((state) => state.auth);
  const api = helpHttp();
  const [message, setMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const url = `http://localhost:8000/api/status/register`;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
    };

    api
      .post(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: data,
      })
      .then((res) => {
        if (
          res.message === "Registro creado exitosamente" &&
          res.status === 201
        ) {
          setMessage(res.message);

          setTimeout(() => {
            setMessage("");
            navigate("/status-device");
          }, 3000);
        } else {
            console.log(res)
          setFailMessage(res.message);
        }
      });
  };
  return (
    <div className="card mt-5">
      <div className="card-header d-flex ">
        <h4>Agregar status dispositivos</h4>
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
              placeholder="Ejemplo: En uso"
              onChange={(e) => setName(e.target.value)}
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

export default AddStatus;
