import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PropTypes from "prop-types";
import ImgNoCurses from "../../../assets/img/y_los_cursos.jpeg";
import { UserAuth } from "../../../hooks/auth/Auth.Provider";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardCurse({
  name,
  id,
  curseSelectect,
  seCurseSelectect,
}) {
  const mode = "ModeLight";
  const { dataUser } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleDeselectCurse = (id) => {
    seCurseSelectect(id);
  };
  
  const handleEditCurse = (id) => {
    navigate(`/curso/${id}`);
  };
  const handleViewCurse = (id) => {
    navigate(`/curso/${id}`);
  };
  return (
    <Card
      sx={{
        backgroundColor: curseSelectect === id ? "green" : "light-gray",
        width: "300px",
        margin: "15px",
      }}
    >
      <CardActionArea
        className={"GM__" + mode + "__main-curses-cardcon-card"}
        onClick={() => {
          if (dataUser && dataUser.roll === "admin") {
            return location.pathname === "/cursos"
              ? handleDeselectCurse(id)
              : handleEditCurse(id);
          } else {
            return handleViewCurse(id);
          }
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={ImgNoCurses}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CardCurse.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  curseSelectect: PropTypes.string.isRequired,
  seCurseSelectect: PropTypes.func.isRequired,
};
