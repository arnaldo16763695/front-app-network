import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import "styled-components";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";
import { helpHttp } from "../../../helpers/helpHttp";

const HeadquatersManagment = () => {
  const api = helpHttp();
  const auth = useSelector((state) => state.auth);
  const [headquaters, setHeadquaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = `http://localhost:8000/api/headquarters`;

  useEffect(() => {
    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setLoading(true);
        if (!res.err) {
          setHeadquaters(res.data);
        } else {
          setHeadquaters({});
        }
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "ESTADO",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "CIUDAD",
      selector: (row) => row.city,
      sortable: true,
    },

    {
      name: "ACCIÓN",
      selector: (row) => (
        <>
          <Link to={`/edit-headquarter/${row.id}`} className="me-3">
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
          <h4>Sucursales</h4>
          <Link to={"/add-headquarter"} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body-ppp">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={headquaters}
              pagination
              theme="custom"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadquatersManagment;
