import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";

const UserManagment = () => {
  const url = `http://localhost:8000/api/user`;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(url),
        usersData = await res.json();
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Gestión de Usuarios</h4>
          <Link to={"/add-user"} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loader />
            ) : (
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
                  {users.data?.map((user) => (
                    <tr key={user.id}>
                      <th>{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Link to={`/edit-user/${user.id}`} className="me-3">
                          <i className="fas fa-pencil" />
                        </Link>{" "}
                        <Link to={""}>
                          <i className="fas fa-trash" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
