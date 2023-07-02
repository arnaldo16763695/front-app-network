import { Link } from "react-router-dom";

const ActionDelete = ({ deleteRegister }) => {
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  const idRol = getCookie("roleId");

  return (
    idRol === "1" && (
      <Link title="Eliminar registro" onClick={deleteRegister}>
        <i className="fas fa-trash" />
      </Link>
    )
  );
};

export default ActionDelete;
