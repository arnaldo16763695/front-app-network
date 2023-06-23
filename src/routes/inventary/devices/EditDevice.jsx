import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";
import Select from "../../../components/Select";
import { Loader } from "../../../components/Loader";

const initialForm = {
  code: "",
  description: "",
  headquarter_id: "",
  location_id: "",
  manufacturer: "",
  model: "",
  name: "",
  observation: " ",
  serial: "",
  status_id: "",
  type_id: "",
};
const EditDevice = () => {
  const { idDevice } = useParams();
  const urlHeadquarters = `http://localhost:8000/api/headquarters`;
  const [headquarters, setHeadquarters] = useState([]);
  const [form, setForm] = useState(initialForm);
  const url = `http://localhost:8000/api/devices/${idDevice}`;
  const urlTypes = `http://localhost:8000/api/types`;

  const [locationsSelect, setLocationsSelect] = useState([]);
  const [locations, setLocations] = useState([]);
  const auth = useSelector((state) => state.auth);
  const locHead = `http://localhost:8000/api/locHead/`;
  const urlStatus = `http://localhost:8000/api/status`;
  const [device, setDevice] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token} `,
        },
      })
      .then((res) => {
        setForm({
          code: res.data[0].code,
          description: res.data[0].description,
          headquarter_id: res.data[0].location.headquarter.id,
          location_id: res.data[0].location.id,
          manufacturer: res.data[0].manufacturer,
          model: res.data[0].model,
          name: res.data[0].name,
          observation: res.data[0].observation,
          serial: res.data[0].serial,
          status_id: res.data[0].status.id,
          type_id: res.data[0].type.id,
        });
        setDevice(res.data[0]);
        // console.log(res.data[0].location.id);
        setLoading(false);
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
        setHeadquarters(res.data);
      });
  }, [auth.token, urlHeadquarters]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "headquarter_id") {
      getAllLocationById(e.target.value);
    }
  };

  useEffect(() => {
    getAllLocationById(idDevice);
  }, []);

  const getAllLocationById = (id) => {
     
    helpHttp()
      .get(`${locHead}${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (!res.err) {
          setLocationsSelect(res.locations);
          console.log(res)
          if (res.message === "No hay datos disponibles") {
            setLocationsSelect([]);
          }
          console.log(res.locations);
        } else {
          setLocationsSelect([]);
          console.log(res.statusText);
        }
      });
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-start">
          <h4>Editar Dispositivo</h4>
        </div>
        <div className="card-body">
          {loading && <Loader /> || (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label fw-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Ingrese el nombre del dispositivo"
                  name="name"
                  onChange={handleChange}
                  value={form.name || ""}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="inputManufacturer"
                  className="form-label fw-bold"
                >
                  Marca
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputManufacturer"
                  placeholder="Ingrese la Marca"
                  name="manufacturer"
                  onChange={handleChange}
                  value={form.manufacturer || ""}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputModel" className="form-label fw-bold">
                  Modelo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputModel"
                  placeholder="Ingrese el modelo"
                  name="model"
                  onChange={handleChange}
                  value={form.model || ""}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputSerial" className="form-label fw-bold">
                  Serial
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSerial"
                  placeholder="Ingrese el mserial"
                  name="serial"
                  onChange={handleChange}
                  value={form.serial || ""}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputCode" className="form-label fw-bold">
                  Código
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCode"
                  placeholder="Ingrese el código"
                  name="code"
                  onChange={handleChange}
                  value={form.code || ""}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputDescription"
                  className="form-label fw-bold"
                >
                  Descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder="Ingrese la Descripción"
                  name="description"
                  onChange={handleChange}
                  value={form.description || ""}
                />
              </div>

              {/* <Select  url={urlHeadquarters} title={'Sucursal'} nameInput={'headquarter'} placeholder={'Elije una sucursal'} handleChange={handleChangeHeadquarter} valueSelect={headquarter} /> */}

              <div className="mb-3">
                <label
                  htmlFor="inputLocation_id"
                  className="form-label fw-bold"
                >
                  Sucursal
                </label>
                <select
                  className="form-control"
                  name="headquarter_id"
                  onChange={handleChange}
                  value={form.headquarter_id}
                >
                  <option value="">Elija la Sucursal...</option>
                  {headquarters.length &&
                    headquarters.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputLocation_id"
                  className="form-label fw-bold"
                >
                  Localización
                </label>
                <select
                  className="form-control"
                  name="location_id"
                  onChange={handleChange}
                  value={form.headquarter_id}
                >
                  <option value="">Elija la localización...</option>

                  {locationsSelect.length &&
                    locationsSelect.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))}
                </select>
              </div>
              <Select
                url={urlStatus}
                title={"Status"}
                nameInput={"status_id"}
                placeholder={"Elije un status"}
                handleChange={handleChange}
                valueSelect={form.status_id}
              />

              <Select
                url={urlTypes}
                title={"Tipo de dispositvo"}
                nameInput={"type_id"}
                placeholder={"Elije un tipo"}
                handleChange={handleChange}
                valueSelect={form.type_id}
              />

              <div className="mb-3">
                <label
                  htmlFor="inputObservation"
                  className="form-label fw-bold"
                >
                  Observación
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputObservation"
                  placeholder="Ingrese la Observación"
                  name="observation"
                  onChange={handleChange}
                  value={form.observation || ""}
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary me-3"
                value="Guardar"
              />
              <Link type="button" to={"/devices"} className="btn btn-warning">
                Cancelar
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDevice;
