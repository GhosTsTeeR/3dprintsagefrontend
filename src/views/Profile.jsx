import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Send } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  FormControl,
  InputLabel,
  NativeSelect,
  Tooltip,
} from "@mui/material";
import { UserAuth } from "../hooks/auth/Auth.Provider";
import { Link } from "react-router-dom";
import { ModifyDataUser, getCurseInfoUser } from "../services";

function getDisplayName(user, dataUser) {
  if (user) {
    if (dataUser) {
      const { userName, name, apellido } = dataUser;

      if (userName) {
        return userName;
      } else if (name && apellido) {
        return name + apellido;
      } else if (name || apellido) {
        return name || apellido;
      }
    }

    return user.email;
  }

  return "Usuario Anónimo";
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile() {
  const [openModal, setOpenModal] = React.useState(false);
  const [curseInfo, setCurseInfo] = React.useState([])
  const { user, dataUser, token, reloadUserBD } = UserAuth();
  const [userData, setUserData] = React.useState({email: user.email, id:user.uid, name:"", lastName:"", document:"", userName:"",cellPhone:""});
  const displayName = getDisplayName(user, dataUser);
  const [open, setOpen] = React.useState(false);
  const [reloadInfo, setReloadInfo] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };
  const handleModfyDataUser = async () => {
    try {
      const datas = await ModifyDataUser(userData, user.uid, token);
      setReloadInfo(true);
      reloadUserBD()
      console.log(datas);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurseInfoUser(user.uid, token);
        setCurseInfo(response.data);
        setReloadInfo(false)
      } catch (error) {
        setReloadInfo(false)
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token, user, dataUser, reloadInfo]);

  const mode = "ModeLight";
  return (
    <div className={"GM__" + mode + "__main-profile"}>
      <div className={"GM__" + mode + "__main-profile-panelU"}>
        <img
          src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
          alt=""
        />
        <div className={"GM__" + mode + "__main-profile-panelU-data"}>
          <img
            src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
            alt="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
          />
          <h1>{displayName}</h1>
          <span>{dataUser ? dataUser.position || "Usuario" : "Usuario"}</span>
        </div>
        <div className={"GM__" + mode + "__main-profile-panelU-setting"}>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Estamos trabajando en ello :)"
                placement="top-end"
              >
                <Button onClick={handleTooltipOpen}>Ajustes</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </div>
      </div>
      <div className={"GM__" + mode + "__main-profile-panelH"}>
        <div className={"GM__" + mode + "__main-profile-panelH-curses"}>
          <h1>Mis cursos</h1>
          <ul>
            {
              curseInfo.map(objeto => (
                <Link to={"/curso/"+objeto.datos.idCurse}>
                  <li key={objeto.nombre_documento}>
                    <Send /><span>{objeto.datos.nameCurse} {objeto.datos.stateCurse?"Finalizado":"en curso"}</span>
                  </li>
                </Link>
              ))            }
            <Link to="/cursos">
              <li>
                <Send /> <span>Ver cursos</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className={"GM__" + mode + "__main-profile-panelH-settings"}>
          <h1>Detalles de la cuenta</h1>
          <div
            className={"GM__" + mode + "__main-profile-panelH-settings-data"}
          >
            <label htmlFor="Nombre">Nombre</label>
            <input
              id="Nombre"
              type="text"
              value={dataUser ? dataUser.name : ""}
              disabled
            />
            <label htmlFor="Apellido">Apellido</label>
            <input
              id="Apellido"
              type="text"
              value={dataUser ? dataUser.lastName : ""}
              disabled
            />
            <label htmlFor="Document">numero de documento</label>
            <input
              id="Document"
              type="number"
              value={dataUser ? dataUser.document : ""}
              disabled
            />
            <label htmlFor="Celular">Numero celular</label>
            <input
              id="Celular"
              type="number"
              value={dataUser ? dataUser.cellPhone : ""}
              disabled
            />
            <label htmlFor="Correo">Correo</label>
            <input
              id="Correo"
              type="email"
              value={dataUser ? dataUser.email || user.email : ""}
              disabled
            />
          </div>
          <div className={"GM__" + mode + "__main-profile-panelH-option"}>
            <button onClick={handleClickOpenModal}>Modificar</button>{" "}
            <button>¿porque veo estos datos?</button>
          </div>
          <Dialog
            open={openModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseModal}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Modifica tu informacion!</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div
                  className={
                    "GM__" + mode + "__main-profile-panelH-settings-data"
                  }
                >
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    type="text"
                    placeholder={dataUser ? dataUser.name : ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="lastName">Apellido</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder={dataUser ? dataUser.lastName : ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="document">numero de documento</label>
                  <input
                    id="document"
                    type="number"
                    placeholder={dataUser ? dataUser.document : ""}
                    onChange={handleInputChange}
                  />
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Seleccione el tipo de miebro que quiere ser
                    </InputLabel>
                    <NativeSelect
                      onChange={handleInputChange}
                      inputProps={{
                        name: "Seleccione el tipo de miebro que quiere ser",
                        id: "position",
                      }}
                    >
                      <option value=""></option>

                      <option value={"Usuario"}>
                        Usuario
                      </option>
                      <option value={"Docente"}>
                        Docente
                      </option>
                      <option value={"Estudiante"}>
                        Estudiante
                      </option>
                    </NativeSelect>
                  </FormControl>
                  <label htmlFor="cellPhone">Numero celular</label>
                  <input
                    id="cellPhone"
                    type="number"
                    placeholder={dataUser ? dataUser.cellPhone : ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email">Correo</label>
                  <input
                    id="email"
                    type="email"
                    value={user.email}
                    placeholder={dataUser ? dataUser.email || user.email : ""}
                    disabled
                  />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancelar</Button>
              <Button onClick={handleModfyDataUser}>Modificar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
