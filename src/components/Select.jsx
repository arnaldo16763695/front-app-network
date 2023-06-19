import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useSelector } from "react-redux";

const Select = ({url, handleChange, placeholder, nameInput, title}) => {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  useEffect(() => {
    helpHttp()
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        
          setData(res.data);
         
       
        console.log(res.data)
      });
  }, []);

  return (
    <div className="mb-3">
      <label htmlFor="inputHeadquarter" className="form-label fw-bold">
        {title}
      </label>
      <select
        className="form-control"
        name={nameInput}
        onChange={handleChange}
      >
        <option value={""}>{placeholder}</option>
        {data.length &&
          data.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
