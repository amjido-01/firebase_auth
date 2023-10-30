import { auth } from "../firebase";
import { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  EmailAuthCredential
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
        console.log(user, "from authcontext");
        // ...
      } else {
        // User is signed out
        // ...
        setCurrentUser(null);
        console.log("no user");
        setLoading(false);
      }
    });
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signinwithgoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // This code block from the Firebase documentation can be used here
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      // You can return the user object or any relevant data here if needed
      return user;
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      // You can throw the error to handle it in your Login component
      throw error;
    }
  };

  const signout = () => {
    signOut(auth);
  };

  const resetpassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateemail = (newEmail) => {
    updateEmail(currentUser, newEmail)
      .then(() => {
        console.log("email updated");
      })
      .catch((error) => {
        // Handle error if the password update fails.
        console.error("Error updating password:", error);
        throw error; // You can re-throw the error to handle it in the component that calls this function.
      });
  };

  const updatepassword = () => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, user.password)
    console.log(EmailAuthProvider.credential(user.email ,"see"))

      reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        // Password updated successfully.
        console.log("password changed");
      })
      .catch((error) => {
        // Handle error if the password update fails.
        console.error("Error updating password:", error);
        throw error; // You can re-throw the error to handle it in the component that calls this function.
      });
  };

  const value = {
    currentUser,
    signup,
    login,
    signinwithgoogle,
    signout,
    setLoading,
    loading,
    resetpassword,
    updateemail,
    updatepassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
