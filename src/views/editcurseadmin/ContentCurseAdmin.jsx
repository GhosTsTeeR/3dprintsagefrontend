import { Delete } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function ContentCurse({
  position,
  setPosition,
  courseInfo,
  setCourseInfo,
  setNameCurse,
  text,
  setText,
  stateSelection,
  handleEditCourse,
}) {
  const handleUpdateNameCurse = (e) => {
    setNameCurse(e.target.value);
  };

  const handleUpdateTitleSectionCurse = (id, newTitle) => {
    setCourseInfo((prevCourseInfo) => ({
      ...prevCourseInfo,
      data: prevCourseInfo.data.map((info) =>
        info.id === id ? { ...info, title: newTitle } : info
      ),
    }));
  };

  const handleAddSectionCurse = () => {
    const newOption = {
      id: Date.now(),
      title: "Introduccion",
      sections: null,
      dataActivity: [],
      dataQuill: "",
      position: Array.isArray(courseInfo.data) ? courseInfo.data.length + 1 : 1,
    };

    setCourseInfo((prevCourseInfo) => ({
      ...prevCourseInfo,
      data: [...(prevCourseInfo.data || []), newOption],
    }));
  };

  const handleRenderBtn = (id) => {
    const selectedSection = courseInfo.data.find((info) => info.id === id);
    if (selectedSection) {
      setText("");
      setPosition(selectedSection.position);
    }
  };

  const handleOnClickRemoveItemCurse = (id) => {
    setPosition(0);
    setCourseInfo((prevCourseInfo) => ({
      ...prevCourseInfo,
      data: prevCourseInfo.data.filter((item) => item.id !== id),
    }));
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
  const handleEditedyCurseWrapper = async () => {
    await handleEditCourse();
  };
  const mode = "ModeLight";

  return (
    <nav className={"GM__" + mode + "__leftnav-print"}>
      <Button sx={{ margin: "10px" }} onClick={handleEditedyCurseWrapper}>
        Guardar En la BD
      </Button>
      <TextField
        sx={{ margin: "10px", width: "282px" }}
        fullWidth
        type="text"
        value={courseInfo.name || ""}
        placeholder={courseInfo.name || "Porfavor escriba un nombre"}
        onChange={handleUpdateNameCurse}
      />
      <h6>secciones del curso</h6>
      {Array.isArray(courseInfo.data) &&
        courseInfo.data.map((info) => renderTextFieldOrButton(info))}
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
  handleEditCourse: PropTypes.func.isRequired,
};