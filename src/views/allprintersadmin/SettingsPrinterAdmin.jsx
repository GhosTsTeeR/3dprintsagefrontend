import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importa PropTypes

export default function SettingsPrinter({
  printers,
  printerSelectect,
  setPrinterSelectect,
  handleDeletePrinter,
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

  const handleCreatePrinter = () => {
    navigate("/impresoras/create");
  };

  const handleDeselectPrinterWhithId = () => {
    setOpen(false);
    handleDeletePrinter();
  };

  const handleEditPrinter = () => {
    navigate(`/impresora/edit/${printerSelectect}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDelatePrintWrapper = async () => {
    await handleDeletePrinter();
  };
  return (
    <nav className={`GM__${mode}__leftnav-print`}>
      <div className={`GM__${mode}__leftnav-print-search`}>
        <input
          type="text"
          placeholder="Buscar impresora"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {printerSelectect ? <h3>{printerSelectect}</h3> : ""}
      </div>
      {printerSelectect ? (
        <div className={`GM__${mode}__leftnav-print-options`}>
          <button onClick={handleEditPrinter}>Editar</button>
          <button onClick={handleOpen}>Eliminar</button>
          <button onClick={handleDeselectPrinterWhithId}>Deseleccionar</button>
        </div>
      ) : (
        <p className={`GM__${mode}__leftnav-print-message`}>
          Por favor, selecciona una impresora para manejar más ajustes.
        </p>
      )}
      <div className={`GM__${mode}__leftnav-print-filters`}>
        <select>
          <option value="">Todos los materiales</option>
          {/* Mapea los materiales compatibles y crea las opciones */}
          {printers[0]?.specs[7]?.split(", ").map((material, index) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
        {/* Puedes agregar más filtros según tus necesidades */}
      </div>
      <div className={`GM__${mode}__leftnav-print-create`}>
        <button onClick={handleCreatePrinter}>Crear una nueva impresora</button>
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
            ¿Estás seguro de que deseas eliminar esta impresora?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Esta acción no se puede deshacer.
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
            <Button
              onClick={handleDelatePrintWrapper}
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
SettingsPrinter.propTypes = {
  printers: PropTypes.array.isRequired,
  printerSelectect: PropTypes.any.isRequired,
  setPrinterSelectect: PropTypes.func.isRequired,
  handleDeletePrinter: PropTypes.func.isRequired,
};
