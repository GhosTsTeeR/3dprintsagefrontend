import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CheckCircleOutline, DeleteOutline, Send, Warning } from "@mui/icons-material";

const CustomButton = ({ horizontalPosition, verticalPosition, size, type, description, onClick }) => {
  let horizontalAlignment = "center";
  let verticalAlignment = "center";
  let icon = null;

  // Determinar la posición horizontal
  if (horizontalPosition === "left") {
    horizontalAlignment = "flex-start";
  } else if (horizontalPosition === "right") {
    horizontalAlignment = "flex-end";
  }

  // Determinar la posición vertical
  if (verticalPosition === "top") {
    verticalAlignment = "flex-start";
  } else if (verticalPosition === "bottom") {
    verticalAlignment = "flex-end";
  }

  // Determinar el icono según el tipo
  switch (type) {
    case "success":
      icon = <CheckCircleOutline />;
      break;
    case "danger":
      icon = <DeleteOutline />;
      break;
    case "error":
      icon = <Warning />;
      break;
    default:
      icon = null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: horizontalAlignment,
        alignItems: verticalAlignment,
        padding: "10px",
        height: "100%",
        width: "100%",
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        size={size}
        startIcon={icon}
      >
        {description}
      </Button>
    </Box>
  );
};

const CustomButtonGeneral = ({ horizontalPosition, verticalPosition, size, type, description, onClick }) => {
  return (
      <CustomButton
        horizontalPosition={horizontalPosition}
        verticalPosition={verticalPosition}
        size={size}
        type={type}
        description={description}
        onClick={onClick}
      />
  );
};

export default CustomButtonGeneral;
