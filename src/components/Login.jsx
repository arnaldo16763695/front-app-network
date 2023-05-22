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
    <form className="formLogin" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleOnChange}
        value={form.email}
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleOnChange}
        value={form.password}
      />
      <input type="submit" value={"Entrar"} />
    </form>
  );
};

export default Login;
