
import { useParams } from "react-router-dom";


const EditDevice = () => {

  const { idDevice } = useParams();

 

  return (
    <div>
        Editar Device {idDevice}
    </div>
  );
};

export default EditDevice;
