import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SettingsCursesAdmin({
  curseSelectect,
  seCurseSelectect,
  handleDeleteCurse,
  open,
  setOpen
}) {
  const mode = "ModeLight";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCurse = () => {
    navigate("/crear-curso");
  };

  const handleDeselectCurseWithId = () => {
    setOpen(false);
    seCurseSelectect("");
  };

  const handleEditCurse = () => {
    navigate(`/curso/edit/${curseSelectect}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDeleteCurseWrapper = async () => {
    await handleDeleteCurse();
  };
  return (
    <nav className={`GM__${mode}__leftnav-print`}>
      <div className={`GM__${mode}__leftnav-print-search`}>
        <input
          type="text"
          placeholder="Buscar curso"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {curseSelectect ? <h3>{curseSelectect}</h3> : ""}
      </div>
      {curseSelectect ? (
        <div className={`GM__${mode}__leftnav-print-options`}>
          <button onClick={handleEditCurse}>Editar</button>
          <button onClick={handleOpen}>Eliminar</button>
          <button onClick={handleDeselectCurseWithId}>Deseleccionar</button>
        </div>
      ) : (
        <p className={`GM__${mode}__leftnav-print-message`}>
          Por favor, selecciona un curso para manejar más ajustes.
        </p>
      )}
      <div className={`GM__${mode}__leftnav-print-filters`}>
        {/* Puedes agregar más filtros según tus necesidades */}
      </div>
      <div className={`GM__${mode}__leftnav-print-create`}>
        <button onClick={handleCreateCurse}>Crear un nuevo curso</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            ¿Estás seguro de que deseas eliminar este curso?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Esta acción no se puede deshacer.
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteCurseWrapper}
              variant="contained"
              color="error"
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </nav>
  );
}

// Agrega las validaciones de PropTypes
SettingsCursesAdmin.propTypes = {
  curseSelectect: PropTypes.any.isRequired,
  seCurseSelectect: PropTypes.func.isRequired,
  handleDeleteCurse: PropTypes.func.isRequired,
};
