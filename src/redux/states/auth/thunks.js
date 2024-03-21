import { checkingCredentials, login, logout } from ".";
import { signInWithGoogle } from "@/utilities";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};


export const startGoogleSignIn = () => {
  
  return async (dispatch) => {
    
    dispatch(checkingCredentials());
    
    const result = await signInWithGoogle();

    if(!result.ok) return dispatch(logout({errorMessage: result.errorMessage}))
    
    dispatch(login(result));
    
    console.log(result)
  };
}