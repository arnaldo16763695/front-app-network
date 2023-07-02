import { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";
import DataTable, { createTheme } from "react-data-table-component";
import ActionEdit from "../../../components/ActionEdit";
import ActionDelete from "../../../components/ActionDelete";
import { BtnAdd } from "../../../components/BtnAdd";
import Swal from "sweetalert2";

const Spaces = () => {
  const url = `http://localhost:8000/api/locations`;
  const auth = useSelector((state) => state.auth);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSpaces = ()=>{
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
  }
  useEffect(() => {
   getSpaces();
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

        getSpaces();
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
          <ActionEdit link={`/edit-space/${row.id}`} />
          <ActionDelete deleteRegister={()=>deleteRegister(row.id)} />
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
          
          <BtnAdd link={"/add-space"}/>
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
