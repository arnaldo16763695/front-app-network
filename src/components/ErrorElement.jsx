import { useRouteError } from "react-router-dom"



const ErrorElement = () => {
    let error = useRouteError();
  return (
    <div>{error}</div>
  )
}

export default ErrorElement