import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { useSelector } from "react-redux";
import { helpHttp } from "../../helpers/helpHttp";
import DataTable, { createTheme } from "react-data-table-component";
import ActionEdit from "../../components/ActionEdit";
import ActionDelete from "../../components/ActionDelete";
import ActionKey from "../../components/ActionKey";
import Swal from "sweetalert2";
const UserManagment = () => {
  const url = `http://localhost:8000/api/user`;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const deleteRegister = (id) => {
    Swal.fire({
      title: "¿ Estás segur@ ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminarlo!",
      cancelButtonText: "No, Mantenerlo",
    }).then((result) => {
      if (result.isConfirmed) {
        helpHttp()
          .del(url + "/" + id, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Eliminado!", `${res.message}`, "success");
            } else {
              Swal.fire("Hubo un problema", `${res.message}`, "error");
            }
          });
          getUsers();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  };
  const getUsers = () => {
    setLoading(true);
    helpHttp()
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (!res.err) {
          setUsers(res.data);
          // console.log(res.data);
        } else {
          setUsers([]);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  // console.log(auth.token);
  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "TELÉFONO",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "ROL",
      selector: (row) => row.roles[0].name,
      sortable: true,
    },

    {
      name: "ACCIÓN",
      selector: (row) => (
        <>
          <ActionEdit link={`/edit-user/${row.id}`} />

          <ActionKey link={`/change-pass/${row.id}`} />

          <ActionDelete deleteRegister={() => deleteRegister(row.id)} />
        </>
      ),
      sortable: true,
    },
  ];

  // createTheme creates a new theme named solarized that overrides the build in dark theme
  createTheme(
    "custom",
    {
      text: {
        primary: "#000",
        secondary: "#000",
      },
      background: {
        default: "#EAECEE",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#fff",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );
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
          <div className="card-body-ppp">
            {loading ? (
              <Loader />
            ) : (
              <DataTable
                columns={columns}
                data={users}
                pagination
                theme="custom"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
