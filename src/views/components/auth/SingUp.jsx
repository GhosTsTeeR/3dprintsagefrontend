import React, { useState } from "react";
import { RemoveRedEye, VisibilityOff, VerifiedUser } from "@mui/icons-material";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { UserAuth } from "../../../hooks/auth/Auth.Provider";
import CustomSnackbar from "../CustomSnackbar";

const validatePassword = (password) => {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return password.length >= 6 && specialCharRegex.test(password);
};

export default function SignUp() {
  const { signUp, googleSignIn } = UserAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOnChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const sendUser = async (user, password) => {
    if (!validatePassword(password)) {
      setSnackbarMessage('La contraseña debe tener al menos 6 caracteres y un carácter especial');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage('Las contraseñas no coinciden');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await signUp(user, password);
      setSnackbarMessage('Cuenta creada exitosamente');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setSnackbarMessage('El correo electrónico ya está registrado. Por favor, utiliza otro correo.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } else {
        console.log(error);
        setSnackbarMessage('Error al crear la cuenta');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
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

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              type="email"
              placeholder="Correo"
              onChange={handleOnChangeUser}
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
        <div className={`GM__${mode}__login-content-group`}>
          <label htmlFor="confirmPassword">Repite la Password</label>
          <div className={`GM__${mode}__login-content-group-input`}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Digite su contraseña nuevamente"
              onChange={handleOnChangeConfirmPassword}
            />
            <IconButton onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <VisibilityOff /> : <RemoveRedEye />}
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
            Crear cuenta
          </button>
        </div>
      </div>
      <div className={`GM__${mode}__login-footer`}>
        <button
          onClick={() => handleListItemClick()}
          className={`GM__${mode}__login-footer-btnG`}
        >
          Crear cuenta con Google
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