import { useEffect } from "react";

import { Outlet, Link, useNavigate } from "react-router-dom";

import { addAuth } from "../features/auth/authSlice";
function Root() {
 
  useEffect(() => {
    if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      document.body.classList.add("sb-sidenav-toggled");
    }

    
  }, []);

  const addToggled = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };
  return (
    <>
      <div>
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
          <form name="form-search" id="form-search" className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
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
                  <Link to={""} className="dropdown-item" href="#!">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to={""} className="dropdown-item" href="#!">
                    Activity Log
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={""} className="dropdown-item" href="#!">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
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
                      <Link
                        to={""}
                        className="nav-link"
                        href="layout-sidenav-light.html"
                      >
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
                      <Link
                        to={"users"}
                        className="nav-link"
                        href="layout-static.html"
                      >
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
                          <Link
                            to={""}
                            className="nav-link"
                            href="register.html"
                          >
                            Register
                          </Link>
                          <Link
                            to={""}
                            className="nav-link"
                            href="password.html"
                          >
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
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <Outlet />
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright © Your Website 2023
                  </div>
                  <div>
                    <Link to={""} href="#">
                      Privacy Policy
                    </Link>
                    ·
                    <Link to={""} href="#">
                      Terms &amp; Conditions
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
