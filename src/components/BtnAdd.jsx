import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const BtnAdd = ({ link }) => {
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
    idRol !== "3" && (
      <Link to={link} className="btn btn-primary">
        <i className="fas fa-user-plus" />
      </Link>
    )
  );
};

BtnAdd.propTypes = {
    link: PropTypes.node.isRequired,
  };
