import { error, setRoles } from ".";
import axios from "axios";

export const fetchRoles = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8099/api/dominguez/rol"
      );
      dispatch(setRoles(response.data));
    } catch (e) {
      dispatch(error({ errorMessage: e.message }));
      console.log(error);
    }
  };
};
