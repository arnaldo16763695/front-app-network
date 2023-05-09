import { Link } from "react-router-dom";

const UserManagment = () => {
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Gestión de Usuarios</h4>
          <Link to={'/add-user'} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre y Apellido</th>
                  <th scope="col">Email</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Arnaldo Espinoza</td>
                  <td>aespinoza@vit.gob.ve</td>
                  <td>45616515516</td>
                  <td>
                    <Link to={""} className="me-3">
                      <i className="fas fa-pencil" />
                    </Link>{" "}
                    <Link to={""}>
                      <i className="fas fa-trash" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
