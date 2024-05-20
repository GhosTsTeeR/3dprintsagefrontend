import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Select,
  TextareaAutosize,
  MenuItem,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomButtonGeneral from "../components/btn/CustomButton";

export default function SettingsPrinter({
  printerData,
  setPrinterData,
  handleCreatePrinter,
}) {
  const mode = "ModeLight";
  const [currentSection, setCurrentSection] = useState("");
  const printerStores = [
    {
      name: "Amazon",
      link: "https://www.amazon.com/",
    },
    {
      name: "Mercado Libre",
      link: "https://www.mercadolibre.com/",
    },
    {
      name: "HTA3D",
      link: "https://hta3d.com/",
    },
    {
      name: "3DJake",
      link: "https://www.3djake.com/",
    },
    {
      name: "Tienda Krear 3D",
      link: "https://www.tiendakrear3d.com/",
    },
    {
      name: "TecSol 3D",
      link: "https://www.tecsol3d.com/",
    },
    {
      name: "Print3D Colombia",
      link: "https://www.print3dcolombia.com/",
    },
    {
      name: "Arrowti3D",
      link: "https://www.arrowti3d.com/",
    },
    {
      name: "3D Center",
      link: "https://www.3dcenter.com.co/",
    },
  ];
  const navigate = useNavigate()

  const handleSectionClick = (section) => {
    setCurrentSection(section);
  };

  const handleGoBack = () => {
    setCurrentSection("");
  };

  const handleInputChange = (field, value) => {
    setPrinterData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSpecChange = (index, value) => {
    const newSpecs = [...printerData.specs];
    newSpecs[index] = value;
    setPrinterData((prevData) => ({
      ...prevData,
      specs: newSpecs,
    }));
  };

  const handleAddSpec = () => {
    setPrinterData((prevData) => ({
      ...prevData,
      specs: [...prevData.specs, ""],
    }));
  };

  const handleRemoveSpec = (index) => {
    const newSpecs = [...printerData.specs];
    newSpecs.splice(index, 1);
    setPrinterData((prevData) => ({
      ...prevData,
      specs: newSpecs,
    }));
  };
  const handleBuyLinkChange = (index, name, url) => {
    const newBuyLinks = [...printerData.buyLinks];
    newBuyLinks[index] = { name, url };
    setPrinterData((prevData) => ({
      ...prevData,
      buyLinks: newBuyLinks,
    }));
  };
  
  const handleAddBuyLink = () => {
    setPrinterData((prevData) => ({
      ...prevData,
      buyLinks: [...prevData.buyLinks, { name: "", url: "" }],
    }));
  };
  
  const handleRemoveBuyLink = (index) => {
    const newBuyLinks = [...printerData.buyLinks];
    newBuyLinks.splice(index, 1);
    setPrinterData((prevData) => ({
      ...prevData,
      buyLinks: newBuyLinks,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setPrinterData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setPrinterData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };
  const handleRemoveImage = (index) => {
    const newImages = [...printerData.images];
    newImages.splice(index, 1);
    setPrinterData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };
  const handleReturnPrinters = () => {
    navigate("/impresoras");
  }
  const handleAdPrintWrapper = async () => {
    await handleCreatePrinter();
  };
  const renderSection = () => {
    switch (currentSection) {
      case "descripcion":
        return (
          <div className={`GM__${mode}__leftnav-add-print-section`}>
            <div className={`GM__${mode}__leftnav-add-print-section-header`}>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Descripción</h3>
            </div>
            <TextareaAutosize
              minRows={5}
              maxRows={10}
              placeholder="Ingrese una descripción breve (máximo 300 caracteres)"
              value={printerData.shortDescription}
              onChange={(e) =>
                handleInputChange(
                  "shortDescription",
                  e.target.value.slice(0, 300)
                )
              }
            />
          </div>
        );
      case "descripcion-completa":
        return (
          <div className={`GM__${mode}__leftnav-add-print-section`}>
            <div className={`GM__${mode}__leftnav-add-print-section-header`}>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Descripción completa</h3>
            </div>
            <TextareaAutosize
              minRows={10}
              maxRows={20}
              placeholder="Ingrese una descripción completa (máximo 1000 caracteres)"
              value={printerData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value.slice(0, 1000))
              }
            />
          </div>
        );
      case "ficha-tecnica":
        return (
          <div className={`GM__${mode}__leftnav-add-print-section`}>
            <div className={`GM__${mode}__leftnav-add-print-section-header`}>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Ficha técnica</h3>
            </div>
            {printerData.specs.map((spec, index) => (
              <div
                key={index}
                className={`GM__${mode}__leftnav-add-print-section-spec`}
              >
                <TextareaAutosize
                  minRows={1}
                  maxRows={5}
                  value={spec}
                  onChange={(e) => handleSpecChange(index, e.target.value)}
                />
                <IconButton onClick={() => handleRemoveSpec(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <CustomButtonGeneral
              onClick={handleAddSpec}
              horizontalPosition="center"
              verticalPosition="bottom"
              size="medium"
              type="success"
              description="Agregar especificación"
            />
          </div>
        );
        case "links-de-compra":
          return (
            <div className={`GM__${mode}__leftnav-add-print-section`}>
              <div className={`GM__${mode}__leftnav-add-print-section-header`}>
                <IconButton onClick={handleGoBack}>
                  <ArrowBackIcon />
                </IconButton>
                <h3>Links de compra</h3>
              </div>
              {printerData.buyLinks.map((link, index) => (
                <div key={index} className={`GM__${mode}__leftnav-add-print-section-buylink`}>
                  <FormControl sx={{ m: 1, width: "90%" }}>
                    <Select
                      value={link.url}
                      onChange={(e) => {
                        const selectedStore = printerStores.find((store) => store.link === e.target.value);
                        handleBuyLinkChange(index, selectedStore.name, selectedStore.link);
                      }}
                    >
                      {printerStores.map((store, storeIndex) => (
                        <MenuItem key={storeIndex} value={store.link}>
                          {store.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => handleRemoveBuyLink(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <CustomButtonGeneral
                onClick={handleAddBuyLink}
                horizontalPosition="center"
                verticalPosition="bottom"
                size="medium"
                type="success"
                description="Agregar link de compra"
              />
            </div>
          );
      case "galeria-imagenes":
        return (
          <div className={`GM__${mode}__leftnav-add-print-section`}>
            <div className={`GM__${mode}__leftnav-print-section-header`}>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon />
              </IconButton>
              <h3>Galería de imágenes</h3>
            </div>
            <div
              className={`GM__${mode}__leftnav-add-print-section-upload`}
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <CloudUploadIcon />
              <p>Arrastra u oprime el icono</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </div>
            <div className={`GM__${mode}__leftnav-add-print-section-preview`}>
              {printerData.images.map((image, index) => (
                <div
                  key={index}
                  className={`GM__${mode}__leftnav-add-print-section-preview-image`}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Imagen ${index + 1}`}
                  />
                  <IconButton
                    className={`GM__${mode}__leftnav-add-print-section-preview-delete`}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className={`GM__${mode}__leftnav-add-print-options`}>
              <textarea
                placeholder="Título (máximo 100 caracteres)"
                value={printerData.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value.slice(0, 70))
                }
              />
              <button onClick={() => handleSectionClick("descripcion")}>
                Descripción
              </button>
              <button
                onClick={() => handleSectionClick("descripcion-completa")}
              >
                Descripción completa
              </button>
              <button onClick={() => handleSectionClick("ficha-tecnica")}>
                Ficha técnica
              </button>
              <button onClick={() => handleSectionClick("links-de-compra")}>
                Links de compra
              </button>
              <button onClick={() => handleSectionClick("galeria-imagenes")}>
                Galería de imágenes
              </button>
              <button onClick={() => handleReturnPrinters()}>
                Regresar a impresoras
              </button>
            </div>
            <div className={`GM__${mode}__leftnav-add-print-create`}>
              <CustomButtonGeneral
                onClick={handleAdPrintWrapper}
                horizontalPosition="center"
                verticalPosition="bottom"
                size="large"
                type="success"
                description="Agregar Impresora"
              />
            </div>
          </>
        );
    }
  };

  return <nav className={`GM__${mode}__leftnav-print`}>{renderSection()}</nav>;
}
