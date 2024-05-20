import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function ViewPrinter({ printerData, setId }) {
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
  const mode = "ModeLight";

  if (!printerData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`GM__${mode}__main`}>
      <div className={`GM__${mode}__main-create-print-row`}>
        <div className={`GM__${mode}__main-create-print-row-image-container`}>
          {printerData.images && printerData.images.length > 0 && (
            <img src={printerData.images[0]} alt={`${printerData.name} - Imagen 1`} />
          )}
        </div>
        <div className={`GM__${mode}__main-create-print-row-info-container`}>
          <div>
            <h1>{printerData.name}</h1>
            <p>{printerData.shortDescription}</p>
          </div>
        </div>
      </div>
      <div className={`GM__${mode}__main-create-print-row`}>
        <div className={`GM__${mode}__main-create-print-row-description`}>
          <h2>Descripción</h2>
          <p>{printerData.description}</p>
        </div>
        <div className={`GM__${mode}__main-create-print-row-specs`}>
          <h2>Ficha técnica</h2>
          <ul>
            {printerData.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
        <div className={`GM__${mode}__main-create-print-row-buy-links`}>
          <h2>Dónde comprar</h2>
          <ul>
            {printerData.buyLinks.map((link) => (
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
          {printerData.images.map((image, index) => (
            <div className={`GM__${mode}__main-create-print-gallery-images-item`} key={index}>
              {typeof image === "string" ? (
                <img src={image} alt={`Imagen ${index + 1}`} />
              ) : (
                <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ViewPrinter.propTypes = {
  printerData: PropTypes.object.isRequired,
  setId: PropTypes.func.isRequired,
};