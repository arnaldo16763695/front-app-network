import {Link} from "react-router-dom";

const SideNavMenu = () => {
  return (
    <div className="sb-sidenav-menu">
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Core</div>
        <Link to={"home"} className="nav-link" href="index.html">
          <div className="sb-nav-link-icon">
            <i className="fas fa-home" />
          </div>
          Inicio
        </Link>
        {/* <div className="sb-sidenav-menu-heading">Interface</div> */}
        <Link
          to={""}
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
        </Link>
        <div
          className="collapse"
          id="collapseLocation"
          aria-labelledby="headingOne"
          data-bs-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              to={"/headquaters"}
              className="nav-link"
              href="layout-static.html"
            >
              Sucursales
            </Link>
            <Link to={""} className="nav-link" href="layout-sidenav-light.html">
              Espacios
            </Link>
          </nav>
        </div>

        <Link
          to={""}
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
        </Link>
        <div
          className="collapse"
          id="collapseUsers"
          aria-labelledby="headingOne"
          data-bs-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link to={"users"} className="nav-link" href="layout-static.html">
              Gestionar Usuarios
            </Link>
          </nav>
        </div>

        <Link
          to={""}
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-user" />
          </div>
          Example
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </Link>
        <div
          className="collapse"
          id="collapseExample"
          aria-labelledby="headingTwo"
          data-bs-parent="#sidenavAccordion"
        >
          <nav
            className="sb-sidenav-menu-nested nav accordion"
            id="sidenavAccordionPages"
          >
            <Link
              to={""}
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#pagesCollapseAuth"
              aria-expanded="false"
              aria-controls="pagesCollapseAuth"
            >
              Gestionar
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </Link>
            <div
              className="collapse"
              id="pagesCollapseAuth"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link to={""} className="nav-link" href="login.html">
                  Login
                </Link>
                <Link to={""} className="nav-link" href="register.html">
                  Register
                </Link>
                <Link to={""} className="nav-link" href="password.html">
                  Forgot Password
                </Link>
              </nav>
            </div>
            <Link
              to={""}
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#pagesCollapseError"
              aria-expanded="false"
              aria-controls="pagesCollapseError"
            >
              Error
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </Link>
            <div
              className="collapse"
              id="pagesCollapseError"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link to={""} className="nav-link" href="401.html">
                  401 Page
                </Link>
                <Link to={""} className="nav-link" href="404.html">
                  404 Page
                </Link>
                <Link to={""} className="nav-link" href="500.html">
                  500 Page
                </Link>
              </nav>
            </div>
          </nav>
        </div>
        <div className="sb-sidenav-menu-heading">Addons</div>
        <Link to={""} className="nav-link" href="charts.html">
          <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Charts
        </Link>
        <Link to={""} className="nav-link" href="tables.html">
          <div className="sb-nav-link-icon">
            <i className="fas fa-table" />
          </div>
          Tables
        </Link>
      </div>
    </div>
  );
};

export default SideNavMenu;
