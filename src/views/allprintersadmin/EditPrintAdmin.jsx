import React, { useEffect } from "react";
import CustomSnackbar from "../components/CustomSnackbar";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function EditPrintAdmin({
  printer,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  handleSnackbarClose,
  setId,
}) {
  console.log(printer)
  const mode = "ModeLight";
  const { id } = useParams();
  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        setId(id);
      } catch (error) {
        console.error("Error al setear la id:", error);
      }
    };
    if (id) {
      fetchPrinter();
    }
  }, [id]);

  if (!printer) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`GM__${mode}__main`}>
      <div className={`GM__${mode}__main-create-print-row`}>
        <div className={`GM__${mode}__main-create-print-row-image-container`}>
          {printer.images && printer.images.length > 0 && (
            <img
              src={printer.images[0]}
              alt={`${printer.name} - Imagen 1`}
            />
          )}
        </div>
        <div className={`GM__${mode}__main-create-print-row-info-container`}>
          <div>
            <h1>{printer.name}</h1>
            <p>{printer.shortDescription}</p>
          </div>
        </div>
      </div>
      <div className={`GM__${mode}__main-create-print-row`}>
        <div className={`GM__${mode}__main-create-print-row-description`}>
          <h2>Descripción</h2>
          <p>{printer.description}</p>
        </div>
        <div className={`GM__${mode}__main-create-print-row-specs`}>
          <h2>Ficha técnica</h2>
          <ul>
            {printer.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
        <div className={`GM__${mode}__main-create-print-row-buy-links`}>
          <h2>Dónde comprar</h2>
          <ul>
            {printer.buyLinks.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`GM__${mode}__main-create-print-gallery`}>
        <h2>Galería de imágenes</h2>
        <div className={`GM__${mode}__main-create-print-gallery-images`}>
          {printer.images.map((image, index) => (
            <div
              className={`GM__${mode}__main-create-print-gallery-images-item`}
              key={index}
            >
              {typeof image === "string" ? (
                <img src={image} alt={`Imagen ${index + 1}`} />
              ) : (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Imagen ${index + 1}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
        position={{ vertical: "bottom", horizontal: "center" }}
        size={300}
      />
    </div>
  );
}
EditPrintAdmin.propTypes = {
  printer: PropTypes.object.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  snackbarSeverity: PropTypes.string.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
};
