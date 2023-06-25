import { Link } from "react-router-dom";

const SideNavMenu = () => {
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
    <div className="sb-sidenav-menu">
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Core</div>
        <Link to={"home"} className="nav-link">
          <div className="sb-nav-link-icon">
            <i className="fas fa-home" />
          </div>
          Inicio
        </Link>
        {/* <div className="sb-sidenav-menu-heading">Interface</div> */}

        {idRol !== "3" && (
          <>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUsers"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-user" />
              </div>
              Usuarios
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="collapseUsers"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  to={"users"}
                  className="nav-link"
                  href="layout-static.html"
                >
                  Gestionar Usuarios
                </Link>
              </nav>
            </div>
          </>
        )}

        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseLocation"
          aria-expanded="false"
          aria-controls="collapseLayouts"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-map" />
          </div>
          Ubicaciones
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapseLocation"
          aria-labelledby="headingOne"
          data-bs-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              to={"/headquarters"}
              className="nav-link"
              href="layout-static.html"
            >
              Sucursales
            </Link>
            <Link
              to={"spaces"}
              className="nav-link"
              href="layout-sidenav-light.html"
            >
              Espacios
            </Link>
          </nav>
        </div>

        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseInventeray"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <div className="sb-nav-link-icon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          Inventario
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapseInventeray"
          aria-labelledby="headingTwo"
          data-bs-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link to={"devices"} className="nav-link" href="layout-static.html">
              Dispositivos
            </Link>
          </nav>
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              to={"status-device"}
              className="nav-link"
              href="layout-static.html"
            >
              Status
            </Link>
          </nav>
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              to={"types-device"}
              className="nav-link"
              href="layout-static.html"
            >
              Tipos
            </Link>
          </nav>
        </div>
        {/* <div className="sb-sidenav-menu-heading">Addons</div> */}
      </div>
    </div>
  );
};

export default SideNavMenu;
