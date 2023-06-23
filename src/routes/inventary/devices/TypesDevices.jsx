
import { Link } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";

const TypesDevices = () => {
  const [loading, setLoading] = useState(false)
  const [types, setTypes] = useState([]);
  const auth = useSelector((state) => state.auth);
  const url = `http://localhost:8000/api/types`;
  
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
          setTypes(res.data);
        } else {
          setTypes([]);
        }
        setLoading(false);
      });
  }, []); 

  
  const columns = [
    {
      name: "STATUS",
      selector: (row) => row.name,
      sortable: true,
    },
  

    {
      name: "ACCIÓN",
      selector: (row) => (
        <>
          <Link to={`/edit-types/${row.id}`} className="me-3">
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
          <h4>Tipos de dispositivos</h4>
          <Link to={"/add-types-devices"} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body">
        {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={types}
              pagination
              theme="custom"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TypesDevices;