import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./Auth.Context";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth
} from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { getDataUser } from "../../services";
import CustomSnackbar from "../../views/components/CustomSnackbar";

const AuthProvider = (props) => {
  const [openModalAuth, setOpenModalAuth] = useState(false)
  const cachedUser = JSON.parse(localStorage.getItem("user"));
  const cachedDataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [user, setUser] = useState(cachedUser || null);
  const [dataUser, setDataUser] = useState(cachedDataUser || null);
  const [token, setToken] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [reloadUser, setReloadUser] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (user && token) {
        try {
          const response = await getDataUser(user.uid, token);
          setReloadUser(false)
          if (response.status === 404) {
            setSnackbarMessage('Por favor, actualiza tu información para evitar este mensaje');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
          }
          else if (response.status === 500) {
            setSnackbarMessage(response.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
          else{
            localStorage.setItem('dataUser', JSON.stringify(response.data));
            setDataUser(response.data);
          }

        } catch (error) {
          setReloadUser(false)
          console.error(error);
        }
      }
    };
  
    if (user && token) {
      fetchData();
    }
  }, [user, token, reloadUser]);
  const { children } = props;
  const signUp = async (user, password) => {
    try {
      await createUserWithEmailAndPassword(auth, user, password);
    } catch (error) {
      throw error;
    }
  };
  const getNewToken = async (retryCount = 0) => {
    const firebaseUser = getAuth().currentUser;
    if (firebaseUser) {
      try {
        const newToken = await firebaseUser.getIdToken(true);
        return newToken;
      } catch (error) {
        if (retryCount < 1) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return getNewToken(retryCount + 1);
        } else {
          throw new Error('Failed to get new token after retry');
        }
      }
    } else {
      throw new Error('User is not authenticated');
    }
  };
  const signIn = (user, password) => {
    return signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        throw error;
      });
  };
  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
    setDataUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('dataUser');
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    //signInWithRedirect(auth, provider)
  };

  const getToken = async () => {
    if (user) {
      try {
        const currentToken = await getNewToken();
        setToken(currentToken);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        await getToken();
      } else {
        setToken(null);
        setDataUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('dataUser');
      }
      setTokenLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const reloadUserBD = () => {
    setReloadUser(true);
  };


  return (
    <AuthContext.Provider
      value={{ signUp, signIn, handleSignOut, user, googleSignIn, dataUser, openModalAuth, setOpenModalAuth, token, tokenLoading, reloadUserBD }}
    >
      {children}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
        position={{ vertical: 'bottom', horizontal: 'center' }}
        size={300}
      />
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;