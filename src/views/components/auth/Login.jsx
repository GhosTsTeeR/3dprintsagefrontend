import React, { useState } from "react";
import { RemoveRedEye, VisibilityOff, VerifiedUser } from "@mui/icons-material";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { UserAuth } from "../../../hooks/auth/Auth.Provider";
import CustomSnackbar from "../CustomSnackbar";

export default function Login() {
  const { signIn, googleSignIn } = UserAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOnChangeUser = (e) => {
    setUser(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const sendUser = async (user, password) => {
    if (!isValidEmail) {
      setSnackbarMessage('Por favor, ingresa un correo electrónico válido');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    try {
      await signIn(user, password);
      setSnackbarMessage('Inicio de sesión exitoso');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      let errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      if (error.code === 'auth/invalid-login-credentials') {
        errorMessage = 'Credenciales de inicio de sesión inválidas.';
      }
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleListItemClick = async (event) => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const mode = "ModeLight";

  return (
    <div className={`GM__${mode}__login`}>
      <div className={`GM__${mode}__login-header`}>
        <img src="https://api.dicebear.com/7.x/bottts/png" alt="" />
      </div>
      <div className={`GM__${mode}__login-content`}>
        <div className={`GM__${mode}__login-content-group`}>
          <label htmlFor="user">Usuario</label>
          <div className={`GM__${mode}__login-content-group-input`}>
            <input
              id="user"
              type="text"
              placeholder="Usuario o correo"
              onChange={handleOnChangeUser}
              style={{ borderColor: isValidEmail ? 'initial' : 'red' }}
            />
            <VerifiedUser id="user" />
          </div>
        </div>
        <div className={`GM__${mode}__login-content-group`}>
          <label htmlFor="password">Password</label>
          <div className={`GM__${mode}__login-content-group-input`}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite su contraseña"
              onChange={handleOnChangePassword}
            />
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
            </IconButton>
          </div>
        </div>
        <div className={`GM__${mode}__login-content-checkbox`}>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Captcha"
          />
        </div>
        <div className={`GM__${mode}__login-content-btn-login`}>
          <button
            className={`GM__${mode}__login-content-btn`}
            onClick={() => sendUser(user, password)}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
      <div className={`GM__${mode}__login-footer`}>
        <button
          onClick={() => handleListItemClick()}
          className={`GM__${mode}__login-footer-btnG`}
        >
          Iniciar sesión con Google
        </button>
        <button className={`GM__${mode}__login-footer-btnP`}>
          Olvidé mi contraseña
        </button>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
        position={{ vertical: 'bottom', horizontal: 'center' }}
        size={300}
      />
    </div>
  );
}