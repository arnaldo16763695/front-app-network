import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import "styled-components";

const HeadquatersManagment = () => {
  useEffect(() => {
    showData();
  }, []);

  const [headquaters, setHeadquaters] = useState([]);
  const url = `https://gorest.co.in/public/v2/users`;
  const showData = async () => {
    try {
      console.log(url);
      const res = await fetch(url),
        datajson = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      setHeadquaters(datajson);
      console.log(datajson);
    } catch (error) {
      let message = error.statusText || "ocurrió un error";
      console.log(error.status, message);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "DIRECCIÓN",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "GENERO",
      selector: (row) => row.gender,
      sortable: true,
    },

    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "ACCIÓN",
      selector: () => (
        <>
          <Link to={""} className="me-3">
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
          <Link to={"/add-user"} className="btn btn-primary">
            <i className="fas fa-user-plus" />
          </Link>
        </div>
        <div className="card-body-ppp">
          <DataTable
            columns={columns}
            data={headquaters}
            pagination
            theme="custom"
          />
        </div>
      </div>
    </div>
  );
};

export default HeadquatersManagment;
