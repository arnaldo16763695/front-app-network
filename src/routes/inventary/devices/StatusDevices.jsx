import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";
import ActionEdit from "../../../components/ActionEdit";
import ActionDelete from "../../../components/ActionDelete";
import { BtnAdd } from "../../../components/BtnAdd";

const StatusDevices = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const auth = useSelector((state) => state.auth);
  const url = `http://localhost:8000/api/status`;

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
          setStatus(res.data);
        } else {
          setStatus([]);
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
          <ActionEdit link={`/edit-status/${row.id}`} />
          <ActionDelete link={``} />
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
          <h4>Status de dispositivos</h4>

          <BtnAdd link={"/add-status-devices"} />
        </div>
        <div className="card-body">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={status}
              pagination
              theme="custom"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusDevices;
