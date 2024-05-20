import React from "react";
import ImgPrint from "../../assets/img/1415789.jpeg";
import CustomSnackbar from "../components/CustomSnackbar";

const examplePrinterData = {
  name: "Impresora 3D de ejemplo",
  shortDescription:
    "Una impresora 3D de alta calidad con excelentes resultados.",
  description:
    "Esta es una descripción de ejemplo para la impresora 3D. Aquí puedes detallar las características y beneficios de la impresora.",
  specs: [
    "Tecnología de impresión: FDM",
    "Volumen de impresión: 200 x 200 x 200 mm",
    "Resolución de capa: 100-400 micrones",
    "Velocidad de impresión: hasta 150 mm/s",
    "Compatibilidad con materiales: PLA, ABS, PETG, TPU",
  ],
  buyLinks: [
    {
      store: "Amazon",
      url: "https://www.amazon.com/ejemplo-impresora-3d",
    },
    {
      store: "Mercado Libre",
      url: "https://www.mercadolibre.com/ejemplo-impresora-3d",
    },
  ],
  images: [ImgPrint, ImgPrint, ImgPrint, ImgPrint, ImgPrint],
};

export default function CreatePrintAdmin({ printerData, snackbarOpen, setSnackbarOpen, snackbarMessage, snackbarSeverity, handleSnackbarClose }) {
  const mode = "ModeLight";
  return (
    <div className={`GM__${mode}__main`}>
      <div className={`GM__${mode}__main-create-print-row`}>
        <div className={`GM__${mode}__main-create-print-row-image-container`}>
          {printerData.images && printerData.images.length > 0 ? (
            <img
              src={URL.createObjectURL(printerData.images[0])}
              alt={`${printerData.name} - Imagen 1`}
            />
          ) : (
            <img
              src={examplePrinterData.images[0]}
              alt={`${examplePrinterData.name} - Imagen 1`}
            />
          )}
        </div>
        <div className={`GM__${mode}__main-create-print-row-info-container`}>
          <div>
            <h1>{printerData.name || examplePrinterData.name}</h1>
            <p>
              {printerData.shortDescription ||
                examplePrinterData.shortDescription}
            </p>
          </div>
        </div>
      </div>
      <div className={`GM__${mode}__main-create-print-row`}>
        <div className={`GM__${mode}__main-create-print-row-description`}>
          <h2>Descripción</h2>
          <p>{printerData.description || examplePrinterData.description}</p>
        </div>
        <div className={`GM__${mode}__main-create-print-row-specs`}>
          <h2>Ficha técnica</h2>
          <ul>
            {(printerData.specs || examplePrinterData.specs).map(
              (spec, index) => (
                <li key={index}>{spec}</li>
              )
            )}
          </ul>
        </div>
        <div className={`GM__${mode}__main-create-print-row-buy-links`}>
          <h2>Dónde comprar</h2>
          <ul>
            {(printerData.buyLinks || []).map((link, index) => (
              <li key={index}>
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
          {(printerData.images || examplePrinterData.images).map(
            (image, index) => (
              <div
                className={`GM__${mode}__main-create-print-gallery-images-item`}
                key={index}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`${
                    printerData.name || examplePrinterData.name
                  } - Imagen ${index + 1}`}
                />
              </div>
            )
          )}
        </div>
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
