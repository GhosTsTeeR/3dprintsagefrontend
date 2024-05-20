import React from "react";
import PropTypes from "prop-types";
import CardCurse from "../components/card/CardCurse";
import CustomSnackbar from "../components/CustomSnackbar";

export default function AllCursesAdmin({
  cursesAll,
  curseSelectect,
  seCurseSelectect,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  handleSnackbarClose,
}) {
  const mode = "ModeLight";
  return (
    <div className={"GM__" + mode + "__main"}>
      <div className={"GM__" + mode + "__main-curses"}>
        {cursesAll?.map((course) => (
          <div key={course.id}>
            <CardCurse
              name={course.name}
              id={course.id}
              curseSelectect={curseSelectect}
              seCurseSelectect={seCurseSelectect}
            />
          </div>
        ))}
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

AllCursesAdmin.propTypes = {
  cursesAll: PropTypes.array,
  curseSelectect: PropTypes.any.isRequired,
  seCurseSelectect: PropTypes.func.isRequired,
};
