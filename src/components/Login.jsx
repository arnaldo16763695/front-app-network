import "./css-components/login.css";
import { useState } from "react";
const initialForm = {
  email: "",
  password: "",
};
import { useDispatch } from "react-redux";
import { addAuth } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialForm);
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const createUser = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data)
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      dispatch(addAuth(data))
    } catch (error) {
      let message = error.statusText || "Ocurrió un error";
      console.log(error.status, message);

    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      alert("datos Incompletos");
      return;
    }
    createUser();
  };

  return (

    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">Login AdminRed</h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          onChange={handleOnChange}
                          value={form.email}
                          name="email"
                        />
                        <label htmlFor="inputEmail">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          id="password"
                          onChange={handleOnChange}
                          value={form.password}
                        />
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      {/* <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          id="inputRememberPassword"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inputRememberPassword"
                        >
                          Remember Password
                        </label>
                      </div> */}
                      <div className="d-flex align-items-center justify-content-center mt-4 mb-0">

                        <a className="btn btn-primary" href="index.html">
                          Login
                        </a>
                      </div>
                    </form>
                  </div>
                  {/* <div className="card-footer text-center py-3">
                    <div className="small">
                      <a href="register.html">Need an account? Sign up!</a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright © Your Website 2023</div>
              <div>
                {/* <a href="#">Privacy Policy</a>·
                <a href="#">Terms &amp; Conditions</a> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

    // <form className="formLogin" onSubmit={handleSubmit}>
    //   <label htmlFor="email">Email</label>
    //   <input
    //     type="email"
    //     name="email"
    //     id="email"
    //     onChange={handleOnChange}
    //     value={form.email}
    //   />
    //   <label htmlFor="password">Contraseña</label>
    //   <input
    //     type="password"
    //     name="password"
    //     id="password"
    //     onChange={handleOnChange}
    //     value={form.password}
    //   />
    //   <input type="submit" value={"Entrar"} />
    // </form>
  );
};

export default Login;
