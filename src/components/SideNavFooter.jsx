import { useSelector } from "react-redux"

const SideNavFooter = () => {
  const userName = useSelector((state)=>state.auth.userName)
  return (
    <div className="sb-sidenav-footer">
    <div className="small">
      Logueado como : {userName}
    </div>
    Network
  </div>
  )
}

export default SideNavFooter