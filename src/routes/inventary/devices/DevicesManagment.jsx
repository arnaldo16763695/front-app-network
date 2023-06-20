import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";
const DevicesManagment = () => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const url = `http://localhost:8000/api/devices`;
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
          setDevices(res.data);
          console.log(res.data)
        } else {
          setDevices([]);
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
      name: "MARCA",
      selector: (row) => row.manufacturer,
      sortable: true,
    },
    {
      name: "MODELO",
      selector: (row) => row.serial,
      sortable: true,
    },
    {
      name: "CODE",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "TIPO DE DISPOSITIVO",
      selector: (row) => row.type.name,
      sortable: true,
    },
    {
      name: "STATU",
      selector: (row) => row.status.name,
      sortable: true,
    },
    {
      name: "SUCURSAL",
      selector: (row) => row.location.headquarter.name,
      sortable: true,
    },
    {
      name: "ESPACIO",
      selector: (row) => row.location.name,
      sortable: true,
    },
    {
      name: "OBSERVATION",
      selector: (row) => row.observation,
      sortable: true,
    },

    {
      name: "ACCIÓN",
      selector: (row) => (
        <>
          <Link to={`/edit-device/${row.id}`} className="me-3">
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
          <h4>Administración de dispositivos</h4>
          <Link to={"/add-device"} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body-ppp">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={devices}
              pagination
              theme="custom"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevicesManagment;
