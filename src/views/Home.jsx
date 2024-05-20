import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import CardPrinter from "./components/card/CardPrinter";
import { Plagiarism } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CardCurse from "./components/card/CardCurse";
import AuthContext from "../hooks/auth/Auth.Context";
import ImageCardCurses from "../assets/img/iniciar_sesion.png";
import SinCursos from "../assets/img/y_los_cursos.jpeg";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function Home({ printers, dataCurses }) {
  const { user } = useContext(AuthContext);
  const [curseSelectect, setCurseSelectect] = useState("");
  const mode = "ModeLight";

  const renderCursesContent = () => {
    if (user) {
      if (dataCurses && dataCurses.length > 0) {
        return dataCurses.slice(0, 4).map((course) => (
          <div
            key={course.id}
            className={"GM__" + mode + "__main-curses-cardcon"}
          >
            <CardCurse name={course.name} id={course.id} curseSelectect={curseSelectect} seCurseSelectect={setCurseSelectect} />
          </div>
        ));
      } else {
        return (
          <div className={"GM__" + mode + "__main-curses-cardcon"}>
            <Card
              sx={{
                backgroundColor: "light-gray",
                width: "300px",
                margin: "15px",
              }}
            >
              <CardActionArea
                className={"GM__" + mode + "__main-curses-cardcon-card"}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={SinCursos}
                  alt="No courses available"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Actualmente no se encuentran cursos
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        );
      }
    } else {
      return (
        <div className={"GM__" + mode + "__main-curses-login"}>
          <div className={"GM__" + mode + "__main-curses-login-card"}>
            <img
              src={ImageCardCurses}
              alt="Imagen de inicio de sesión"
              className={"GM__" + mode + "__main-curses-login-img"}
            />
            <h3 className={"GM__" + mode + "__main-curses-login-title"}>
              Inicia sesión para ver los cursos
            </h3>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={"GM__" + mode + "__main"}>
      <div className={"GM__" + mode + "__main-printers"}>
        <CardPrinter datosCard={printers} count={4} />
      </div>
      <div className={"GM__" + mode + "__main-verI"}>
        <Link to="/impresoras" className={"GM__" + mode + "__main-verI-btn"}>
          ver mas Impresoras
        </Link>
        <Plagiarism />
      </div>
      <div className={"GM__" + mode + "__main-curses"}>{renderCursesContent()}</div>
      <div className={"GM__" + mode + "__main-verC"}>
        {user ? (
          <>
            <Link to="/cursos" className={"GM__" + mode + "__main-verC-btn"}>
              ver mas cursos
            </Link>
            <Plagiarism />
          </>
        ) : (
          <button className={"GM__" + mode + "__main-verI-btn"}>
            No puedes acceder
            <Plagiarism />
          </button>
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  printers: PropTypes.array,
  dataCurses: PropTypes.array,
};
