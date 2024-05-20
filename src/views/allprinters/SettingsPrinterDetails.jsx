import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButtonGeneral from "../components/btn/CustomButton";
import { useNavigate } from "react-router-dom";

export default function SettingsPrinterDetails({ printerData }) {
  const mode = "ModeLight";
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("details");

  const handleGoBack = () => {
    navigate("/impresoras");
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "description":
        return (
          <div className={`GM__${mode}__leftnav-print-details-section`}>
            <div className={`GM__${mode}__leftnav-print-details-section-header`}>
              <IconButton onClick={() => handleSectionClick("details")}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Descripción</h3>
            </div>
            <p>{printerData?.shortDescription || ""}</p>
          </div>
        );
      case "full-description":
        return (
          <div className={`GM__${mode}__leftnav-print-details-section`}>
            <div className={`GM__${mode}__leftnav-print-details-section-header`}>
              <IconButton onClick={() => handleSectionClick("details")}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Descripción completa</h3>
            </div>
            <p>{printerData?.description || ""}</p>
          </div>
        );
      case "specs":
        return (
          <div className={`GM__${mode}__leftnav-print-details-section`}>
            <div className={`GM__${mode}__leftnav-print-details-section-header`}>
              <IconButton onClick={() => handleSectionClick("details")}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Ficha técnica</h3>
            </div>
            <ul>
              {(printerData?.specs || []).map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        );
      case "buylinks":
        return (
          <div className={`GM__${mode}__leftnav-print-details-section`}>
            <div className={`GM__${mode}__leftnav-print-details-section-header`}>
              <IconButton onClick={() => handleSectionClick("details")}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Links de compra</h3>
            </div>
            <ul>
              {(printerData?.buyLinks || []).map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      case "gallery":
        return (
          <div className={`GM__${mode}__leftnav-print-details-section`}>
            <div className={`GM__${mode}__leftnav-print-details-section-header`}>
              <IconButton onClick={() => handleSectionClick("details")}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Galería de imágenes</h3>
            </div>
            <div className={`GM__${mode}__leftnav-print-details-gallery-images`}>
              {(printerData?.images || []).map((image, index) => (
                <img
                  key={index}
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt={`Imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className={`GM__${mode}__leftnav-print-details-header`}>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon />
              </IconButton>
              <h2>{printerData?.name || ""}</h2>
            </div>
            <div className={`GM__${mode}__leftnav-print-details-options`}>
              <button onClick={() => handleSectionClick("description")}>
                Descripción
              </button>
              <button onClick={() => handleSectionClick("full-description")}>
                Descripción completa
              </button>
              <button onClick={() => handleSectionClick("specs")}>
                Ficha técnica
              </button>
              <button onClick={() => handleSectionClick("buylinks")}>
                Links de compra
              </button>
              <button onClick={() => handleSectionClick("gallery")}>
                Galería de imágenes
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <nav className={`GM__${mode}__leftnav-print`}>
      <div className={`GM__${mode}__leftnav-print-details`}>{renderSection()}</div>
      {currentSection === "details" && (
        <div className={`GM__${mode}__leftnav-print-details-actions`}>
          <CustomButtonGeneral
            onClick={handleGoBack}
            horizontalPosition="center"
            verticalPosition="bottom"
            size="large"
            type="primary"
            description="Ver más impresoras"
          />
        </div>
      )}
    </nav>
  );
}