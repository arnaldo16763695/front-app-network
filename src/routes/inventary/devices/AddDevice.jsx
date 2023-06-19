import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { helpHttp } from "../../../helpers/helpHttp";
import Select from "../../../components/Select";

const initialForm = {};
const AddDevice = () => {

  const urlLocations = `http://localhost:8000/api/locations`;
  const urlTypes = `http://localhost:8000/api/types`;
  const urlStatus = `http://localhost:8000/api/status`;
  const urlHeadquarters = `http://localhost:8000/api/headquarters`;
  const locHead = `http://localhost:8000/api/locHead/`;
  const auth = useSelector((state) => state.auth);
  const [locations, setLocations] = useState([]);
  const [headquarter, setHeadquarters] = useState('');
  const [locationsSelect, setLocationsSelect] = useState("");
  const [headquartersSelect, setHeadquartersSelect] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...form,
      headquarter_id: headquartersSelect
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 

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

          if (res.message === "No hay datos disponibles") {
            setHeadquarters([]);
          }
          console.log(res);
        } else {
          setHeadquarters([]);
          console.log(res.statusText);
        }
      });
  }, [urlLocations, auth.token]);

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

  const handleChangeHeadquarter = (e) => {
    setHeadquartersSelect(e.target.value);
    getAllLocationById(e.target.value);
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Agregar de Dispositivos</h4>
        </div>
        <div className="card-body">
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
              <label htmlFor="inputManufacturer" className="form-label fw-bold">
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
              <label htmlFor="inputDescription" className="form-label fw-bold">
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

            <div className="mb-3">
              <label htmlFor="inputHeadquarter" className="form-label fw-bold">
                Sucursal
              </label>
              <select
                className="form-control"
                name="headquarter_id"
                onChange={handleChangeHeadquarter}
              >
                <option value={""}>Elija la sucursal...</option>
                {headquarter.length &&
                  headquarter.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* <Select  url={urlHeadquarters} title={'Sucursal'} nameInput={'headquarter'} placeholder={'Elije una sucursal'} handleChange={handleChangeHeadquarter} /> */}

            <div className="mb-3">
              <label htmlFor="inputLocation_id" className="form-label fw-bold">
                Localización
              </label>
              <select
                className="form-control"
                name="location_id"
                onChange={handleChange}
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
            <Select  url={urlStatus} title={'Status'} nameInput={'status_id'} placeholder={'Elije un status'} handleChange={handleChange} />
            <Select  url={urlTypes} title={'Tipo de dispositvo'} nameInput={'type_id'} placeholder={'Elije un tipo'} handleChange={handleChange} />
           
            <div className="mb-3">
              <label htmlFor="inputObservation" className="form-label fw-bold">
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
            <Link type="button" to={"/spaces"} className="btn btn-warning">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;
