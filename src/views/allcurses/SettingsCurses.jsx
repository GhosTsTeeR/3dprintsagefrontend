import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SettingsCurses({ curseSelectect, seCurseSelectect, open, setOpen }) {
  const mode = "ModeLight";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewCurse = () => {
    if (curseSelectect) {
      navigate(`/curso/${curseSelectect}`);
    }
  };

  const handleDeselectCurse = () => {
    setOpen(false);
    seCurseSelectect("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          <button onClick={handleViewCurse}>Ver detalles</button>
          <button onClick={handleDeselectCurse}>Deseleccionar</button>
        </div>
      ) : (
        <p className={`GM__${mode}__leftnav-print-message`}>
          Por favor, selecciona un curso para ver más detalles.
        </p>
      )}
      <div className={`GM__${mode}__leftnav-print-filters`}>
        {/* Puedes agregar más filtros según tus necesidades */}
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
            Detalles del curso
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {/* Aquí puedes mostrar los detalles del curso seleccionado */}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} variant="contained">
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </nav>
  );
}

// Agrega las validaciones de PropTypes
SettingsCurses.propTypes = {
  curseSelectect: PropTypes.any.isRequired,
  seCurseSelectect: PropTypes.func.isRequired,
};