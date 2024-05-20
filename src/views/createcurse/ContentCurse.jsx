import { Delete } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function ContentCurse({
  position,
  setPosition,
  courseInfo,
  setCourseInfo,
  nameCurse,
  setNameCurse,
  text,
  setText,
  stateSelection,
  handleAddyCurseToBD,
}) {
  const handleUpdateNameCurse = (e) => {
    setNameCurse(e.target.value);
  };

  const handleUpdateTitleSectionCurse = (id, newTitle) => {
    const updatedCourseInfo = courseInfo.map((info) =>
      info.id === id ? { ...info, title: newTitle } : info
    );
    setCourseInfo(updatedCourseInfo);
  };

  const handleAddSectionCurse = () => {
    const newOption = {
      id: Date.now(),
      title: "Introduccion",
      sections: null,
      dataActivity: [],
      dataQuill: "",
      position: Array.isArray(courseInfo) ? courseInfo.length + 1 : 1,
    };
    setCourseInfo((prevCourseInfo) => [...(prevCourseInfo || []), newOption]);
  };

  const handleRenderBtn = (id) => {
    const selectedSection = courseInfo.find((info) => info.id === id);
    if (selectedSection) {
      setText("");
      setPosition(selectedSection.position);
    }
  };

  const handleOnClickRemoveItemCurse = (id) => {
    setPosition(0);
    const updatedCourseInfo = courseInfo.filter((item) => item.id !== id);
    setCourseInfo(updatedCourseInfo);
  };

  const renderTextFieldOrButton = (info) => {
    if (info.position === position) {
      return (
        <div style={{ display: "flex", alignItems: "center" }} key={info.id}>
          <TextField
            sx={{ margin: "10px", width: "100%" }}
            fullWidth
            type="text"
            placeholder={info.title || "Por favor, describa la sección"}
            value={info.title}
            onChange={(e) => handleUpdateTitleSectionCurse(info.id, e.target.value)}
          />
          <Delete onClick={() => handleOnClickRemoveItemCurse(info.id)} />
        </div>
      );
    } else {
      return (
        <Button
          sx={{ margin: "10px" }}
          key={info.id}
          fullWidth
          onClick={() => handleRenderBtn(info.id)}
        >
          {info.title}
        </Button>
      );
    }
  };
  const handleAdCurseWrapper = async () => {
    await handleAddyCurseToBD();
  };
  const mode = "ModeLight";

  return (
    <nav className={"GM__" + mode + "__leftnav-print"}>
      <Button sx={{ margin: "10px" }} onClick={handleAdCurseWrapper}>
        Guardar En la BBDD
      </Button>
      <TextField
        sx={{ margin: "10px", width: "282px" }}
        fullWidth
        type="text"
        placeholder={nameCurse || "Porfavor escriba un nombre"}
        onChange={handleUpdateNameCurse}
      />
      <h6>secciones del curso</h6>
      {Array.isArray(courseInfo) &&
        courseInfo.map((info) => renderTextFieldOrButton(info))}
      <Button sx={{ margin: "10px" }} onClick={handleAddSectionCurse}>
        +
      </Button>
    </nav>
  );
}

ContentCurse.propTypes = {
  position: PropTypes.any.isRequired,
  setPosition: PropTypes.func.isRequired,
  courseInfo: PropTypes.any.isRequired,
  setCourseInfo: PropTypes.func.isRequired,
  setNameCurse: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  stateSelection: PropTypes.any.isRequired,
  handleAddyCurseToBD: PropTypes.func.isRequired,
};