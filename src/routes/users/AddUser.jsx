import { Link } from "react-router-dom";

const AddUser = () => {
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Crear Usuario</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="inputCorreo" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="name@example.com"
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
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Rol
              </label>
              <select className="form-select" aria-label="Default select example">
                <option>-------</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
                <option value="3">Three</option>
              </select>
            </div>
            
            <button type="button" className="btn btn-primary me-3">Guardar</button>
            <Link type="button" to={'/users'} className="btn btn-warning">Cancelar</Link>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AddUser;
