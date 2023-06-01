import { Outlet } from "react-router-dom";

import TopNav from "../components/TopNav";
import SideNavMenu from "../components/SideNavMenu";
import SideNavFooter from "../components/SideNavFooter";
import Footer from "../components/Footer";

function Root() {
  return (
    <div>
      <TopNav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <SideNavMenu />
            <SideNavFooter />
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Root;
