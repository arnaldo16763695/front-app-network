
import { Link } from "react-router-dom";

const ActionEdit = ({ link }) => {
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
    (idRol === "1" || idRol === "2") && (
      <Link to={link} className="me-3" title="Editar registro">
        <i className="fas fa-pencil" />
      </Link>
    )
  );
};

export default ActionEdit;
