import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



 const initialForm = {
    name: "",
    email: "",
    phone: "",
    
  };
  const EditUser = () => {
    const auth = useSelector((state) => state.auth);
    const [form, setForm] = useState(initialForm);
    const [rols, setRols] = useState('');
    const {user_id} = useParams();
    const [message, setMessage] = useState('');
  const url_user = `http://localhost:8000/api/user/${user_id}` 
  //  console.log(form)
  const updateUser = async (form) => {
    console.log(form)
    try {
      const res = await fetch(url_user, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
        body: form,
      });
      console.log(url_user)
      setMessage(res.message)
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (
      !form.email.trim() ||
      !form.name.trim() ||
      !form.phone.trim() 
    ) {
      alert("Datos incompletos");
      return;
    }

    updateUser(form);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const getRols = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/roles"),
        rols = await res.json();
      // console.log(rols);
      setRols(rols);

    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async ()=>{
    try {
      const res = await fetch(url_user),
        user = await res.json();
      // console.log(user.data);
       setForm({
        name: user.data.name,
        email: user.data.email,
        phone: user.data.phone,
        
       });

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRols();
    getUser();
  }, []);

 
  
//  console.log(form)
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header d-flex justify-content-between">
          <h4>Editar Usuario</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {message && <di>{message}</di>}
            <div className="mb-3">
              <label htmlFor="inputCorreo" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="name@example.com"
                onChange={handleChange}
                value={form.email || ''}
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre y Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                rows="3"
                onChange={handleChange}
                value={form.name || ''}
                name="name"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                className="form-control"
                id="inputPhone"
                rows="3"
                onChange={handleChange}
                value={form.phone || ''}
                name="phone"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                rows="3"
                onChange={handleChange}
                value={form.password || ''}
                name="password"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Rol
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="role_id"
                onChange={handleChange}
              >
                
                {Object.keys(rols).length > 0 &&
                  rols.roles.map((rol) => <option  value={rol.id} key={rol.id}>{rol.name}</option>)}
              </select>
            </div>

            {/* <input
              type="submit"
              value="Guardar"
              className="btn btn-primary me-3"
            /> */}

            <input
              type="submit"
              className="btn btn-primary me-3"
              value="Guardar"
            />
            <Link type="button" to={"/users"} className="btn btn-warning">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
