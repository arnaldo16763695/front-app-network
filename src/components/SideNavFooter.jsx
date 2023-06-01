

const SideNavFooter = () => {
  return (
    <div className="sb-sidenav-footer">
    <div className="small">
      Logueado como : {localStorage.getItem("userName")}
    </div>
    Network
  </div>
  )
}

export default SideNavFooter