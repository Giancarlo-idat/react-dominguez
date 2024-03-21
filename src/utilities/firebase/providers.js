import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./configFirebase";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(response);
    const {
      displayName,
      email,
      uid,
      phoneNumber,
      accessToken,
    } = response.user;

    return {
      ok: true,
      displayName,
      email,
      phoneNumber,
      accessToken,
      uid,
    };

    

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error(error);
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};
