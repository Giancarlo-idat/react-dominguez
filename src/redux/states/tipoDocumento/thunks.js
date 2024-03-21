import { error, setTIpoDocumento } from ".";
import axios from "axios";

export const fetchTipoDocumento = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8099/api/dominguez/tipo-documento-identidad"
      );
      dispatch(setTIpoDocumento(response.data));
    } catch (e) {
      dispatch(error({ errorMessage: e.message }));
      console.log(e);
    }
  };
};
