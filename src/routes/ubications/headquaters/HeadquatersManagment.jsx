import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import "styled-components";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";
import { helpHttp } from "../../../helpers/helpHttp";
import ActionEdit from "../../../components/ActionEdit";
import ActionDelete from "../../../components/ActionDelete";
import { BtnAdd } from "../../../components/BtnAdd";
import Swal from "sweetalert2";

const HeadquatersManagment = () => {
  const auth = useSelector((state) => state.auth);
  const [headquaters, setHeadquaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = `http://localhost:8000/api/headquarters`;
  const getHeadquarters = () => {
    helpHttp()
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
          setHeadquaters([]);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getHeadquarters();
  }, []);

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
          if (res.message === 'El registro se elimino correctamente') {
            Swal.fire("Eliminado!", `${res.message}`, "success");
          }else{
            Swal.fire("Hubo un problema", `${res.message}`, "error");
          }
        });

        getHeadquarters();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  };

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
          <ActionEdit link={`/edit-headquarter/${row.id}`} />
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
          <h4>Sucursales</h4>

          <BtnAdd link={"/add-headquarter"} />
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
