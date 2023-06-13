import { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";
import { Link } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";

const Spaces = () => {
  
  const url = `http://localhost:8000/api/locations`;
  const auth = useSelector((state) => state.auth);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, [url, auth.token]);

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "SUCURSAL",
      selector: (row) => row.headquarter.name,
      sortable: true,
    },
    {
      name: "OBSERVACIÓN",
      selector: (row) => row.observation,
      sortable: true,
    },

    {
      name: "ACCIÓN",
      selector: (row) => (
        <>
          <Link to={`/edit-space/${row.id}`} className="me-3">
            <i className="fas fa-pencil" />
          </Link>{" "}
          <Link to={""}>
            <i className="fas fa-trash" />
          </Link>
        </>
      ),
      sortable: true,
    },
  ];

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
          <h4>Espacios</h4>
          <Link to={"/add-space"} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={locations}
              pagination
              theme="custom"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Spaces;
