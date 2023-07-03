import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeAuth } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const TopNav = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // is to persisting of  toggle menu
  useEffect(() => {
    if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      document.body.classList.add("sb-sidenav-toggled");
    }
  }, []);

  // is to persisting of  toggle menu
  const addToggled = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };

  // logout in backend
  const logoutSession = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/auth/logout`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const json = await res.json();
      console.log(json);

      if (!res.ok) throw { statusText: res.statusText, status: res.status };
    } catch (error) {
      console.log(error);
    }
  };

  // logout in frontend, modifies localstore
  const logout = () => {
    // localStorage.removeItem("tokenNetwork");
    // localStorage.removeItem("roleId");
    // localStorage.removeItem("userName");

    Swal.fire({
      title: "¿ Estás segur@ de cerrar sesión ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Cerrarla!",
      cancelButtonText: "No, Mantenerla",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "roleName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "roleId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(removeAuth());
        logoutSession();
        navigate("/login");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Sesion aun Activa", "", "success");
      }
    });
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/* Navbar Brand*/}
      <Link to={""} className="navbar-brand ps-3" href="index.html">
        Network
      </Link>
      {/* Sidebar Toggle*/}
      <button
        onClick={addToggled}
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars" />
      </button>
      {/* Navbar Search*/}
      <form
        name="form-search"
        id="form-search"
        className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
      >
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search" />
          </button>
        </div>
      </form>
      {/* Navbar*/}
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <Link
            to={""}
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw" />
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link to={"profile"} className="dropdown-item" href="#!">
                Mi perfil
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button onClick={logout} className="dropdown-item">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
