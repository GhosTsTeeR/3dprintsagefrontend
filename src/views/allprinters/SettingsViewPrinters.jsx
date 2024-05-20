import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function SettingsViewPrinters({
  printers,
  printerSelectect,
  setPrinterSelectect,
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

  const handleViewPrinter = () => {
    if (printerSelectect) {
      navigate(`/impresora/${printerSelectect}`);
    }
  };

  const handleDeselectPrinter = () => {
    setOpen(false);
    setPrinterSelectect(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          <button onClick={handleViewPrinter}>Ver detalles</button>
          <button onClick={handleDeselectPrinter}>Deseleccionar</button>
        </div>
      ) : (
        <p className={`GM__${mode}__leftnav-print-message`}>
          Por favor, selecciona una impresora para ver más detalles.
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
            Detalles de la impresora
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {/* Aquí puedes mostrar los detalles de la impresora seleccionada */}
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
SettingsViewPrinters.propTypes = {
  printers: PropTypes.array.isRequired,
  printerSelectect: PropTypes.any.isRequired,
  setPrinterSelectect: PropTypes.func.isRequired,
};