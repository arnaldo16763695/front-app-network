import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { helpHttp } from "../../../helpers/helpHttp";



const initialForm = {
 
}
const AddDevice = () => {

    const [form, setForm] = useState(initialForm)
    const handleSubmit=()=>{
        
    }
    const handleChange=()=>{

    }

  const url = `http://localhost:8000/api/locations`;
  const auth = useSelector((state) => state.auth);
  const [locations, setLocations] = useState([])
  useEffect(() => {
    
    helpHttp()
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (!res.err) {
          setLocations(res.data);
        } else {
          setLocations([]);
          console.log(res.statusText);
        }
        
      });
  }, [url, auth.token]);
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
                value={form.name}
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
                value={form.manufacturer}
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
                value={form.model}
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
                value={form.serial}
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
                value={form.code}
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
                value={form.description}
              />
            </div>
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
                value={form.observation}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputLocation_id" className="form-label fw-bold">
                Localización
              </label>
              <select
                className="form-control"
                name="location_id"
                onChange={handleChange}
              >
                <option value={""}>Elija la localización...</option>
                {
                    locations.length && locations.map((el)=>(
                        <option key={el.id} value={el.id}>{el.name}</option>
                    ))
                }
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputStatus_id" className="form-label fw-bold">
                Status
              </label>
              <select
                className="form-control"
                name="status_id"
                onChange={handleChange}
              >
                <option value={""}>Elija el status...</option>
              
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputType_id" className="form-label fw-bold">
                Tipo de Dispositivo
              </label>
              <select
                className="form-control"
                name="status_id"
                onChange={handleChange}
              >
                <option value={""}>Elija el tipo...</option>
              
              </select>
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
