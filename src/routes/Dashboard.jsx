import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <>
      <div className="card mt-5">
      
      
        <div className="card-header d-flex ">
          <h4>Dashboard</h4>
        </div>
      
      
        <div className="card-body">
      
          <div className="row">
            <div class="col">
              <div className="card bg-secondary text-white mb-4">
                <div className="card-body">Sucursales</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link className="small text-white stretched-link" to={'/headquarters'}>Ver detalles</Link>
                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div className="card bg-secondary text-white mb-4">
                <div className="card-body">Dispositivos</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link className="small text-white stretched-link" to={'/devices'}>View Details</Link>
                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div className="card bg-secondary text-white mb-4">
                <div className="card-body">Mi perfil</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link className="small text-white stretched-link" to={'/profile'}>View Details</Link>
                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
              </div>
            </div>
          </div>
          
      
        </div>
      
      </div>
    </>
  );
};

export default Dashboard;
