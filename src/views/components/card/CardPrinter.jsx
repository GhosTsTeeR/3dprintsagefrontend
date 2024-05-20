import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { CardActionArea } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../../hooks/auth/Auth.Context";
import { UserAuth } from "../../../hooks/auth/Auth.Provider";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CardWithCarousel({ cardData, impresora, clickImpresora }) {
  const { dataUser } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep + 1) % cardData.images.length
    );
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) =>
        (prevActiveStep - 1 + cardData.images.length) % cardData.images.length
    );
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleDeselectPrinter = (id) => {
    clickImpresora(id);
  };

  const handleEditPrinter = (id) => {
    navigate(`/impresora/edit/${id}`);
  };
  const handleViewPrinter = (id) => {
    navigate(`/impresora/${id}`);
  };
  return (
    <Card
      key={cardData.id}
      sx={{
        maxWidth: 300,
        backgroundColor: impresora === cardData.id ? "green" : "inherit",
      }}
    >
      <CardActionArea>
        <Box
          sx={{
            maxWidth: "300px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {cardData.images.map((dato, datoIndex) => (
              <div key={`${dato}_${datoIndex}`}>
                {Math.abs(activeStep - datoIndex) <= 2 ? (
                  <Box
                  onClick={() => {
                    if (dataUser && dataUser.roll === "admin") {
                      return location.pathname === "/impresoras"
                        ? handleDeselectPrinter(cardData.id)
                        : handleEditPrinter(cardData.id);
                    } else {
                      return handleViewPrinter(cardData.id);
                    }
                  }}
                    component="img"
                    sx={{
                      height: 255,
                      display: "block",
                      maxWidth: 300,
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={dato}
                    alt={dato}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
      </CardActionArea>
      <MobileStepper
        steps={cardData.images.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === cardData.images.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardData.shortDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
CardWithCarousel.propTypes = {
  cardData: PropTypes.object.isRequired,
  impresora: PropTypes.string,
  clickImpresora: PropTypes.func,
};

export default function CardPrinter({
  datosCard,
  count,
  printerSelectect,
  setPrinterSelectect,
}) {
  if (!datosCard || !Array.isArray(datosCard)) {
    // If datosCard is not defined or not an array, show an error message or handle the situation differently
    return [
      <div key="error">Error: datosCard is not defined or not an array</div>,
    ];
  }

  return datosCard
    .slice(0, count)
    .map((cardData) => (
      <CardWithCarousel
        key={cardData.id}
        cardData={cardData}
        impresora={printerSelectect}
        clickImpresora={setPrinterSelectect}
      />
    ));
}
CardPrinter.propTypes = {
  datosCard: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  printerSelectect: PropTypes.string,
  setPrinterSelectect: PropTypes.func,
};
