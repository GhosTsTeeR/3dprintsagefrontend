import React, { useEffect, useState } from "react";
import Home from "../views/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Guide from "../views/Guide";
import AllPrintersAdmin from "../views/allprintersadmin/AllPrintersAdmin";
import MainContentPrintAdmin from "../views/allprintersadmin/MainContentPrintAdmin";
import SettingsPrinterAdmin from "../views/allprintersadmin/SettingsPrinterAdmin";
import SettingsCreateAdmin from "../views/allprintersadmin/SettingsCreateAdmin";
import MainContainerCurseAdmin from "../views/allcursesadmin/MainContainerCurseAdmin";
import MainContentCurseAdmin from "../views/allcursesadmin/MainContentCurseAdmin";
import AllCursesAdmin from "../views/allcursesadmin/AllCursesAdmin";
import SettingsCursesAdmin from "../views/allcursesadmin/SettingsCursesAdmin";

import ProfileAdmin from "../views/ProfileAdmin";


import MainContainerEditCurseAdmin from "../views/editcurseadmin/MainContainerEditCurse";
import MainContentEditCurseAdmin  from "../views/editcurseadmin/MainContentEditCurse";
import EditCurseAdmin  from "../views/editcurseadmin/EditCurseAdmin";
import ContentCurseAdmin  from "../views/editcurseadmin/ContentCurseAdmin";
import {
  addCurseToBD,
  addPrinterToBD,
  deleteCurseFromBD,
  deletePrinterFromBD,
  editCurseToBD,
  editPrinterInBD,
  getDataCurses,
  getDataCursesAll,
  getDataPrinter,
  getDataPrinters,
} from "../services";
import { UserAuth } from "../hooks/auth/Auth.Provider";
import MainContainerPrintAdmin from "../views/allprintersadmin/MainContainerPrintAdmin";
import CreatePrintAdmin from "../views/allprintersadmin/CreatePrintAdmin";
import EditPrintAdmin from "../views/allprintersadmin/EditPrintAdmin";
import SettingsEditPrinter from "../views/allprintersadmin/SettingsEditAdmin";
import LayoutRealizateCurse from "../views/realizatecurse/LayoutRealizateCurse";
import MainContainerCreateCurse from "../views/createcurse/MainContainerCreateCurse";
import MainContentCreateCurse from "../views/createcurse/MainContentCreateCurse";
import CreateCurse from "../views/createcurse/CreateCurse";
import ContentCurse from "../views/createcurse/ContentCurse";
import ArticleSection from "../views/ArticleSection";
import BasicConcepts from "../views/BasicConcepts";

export default function RoutesAdmin() {
  const { user, token } = UserAuth();
  const [open, setOpen] = useState(false);
  const [save, setSave] = useState(true);
  //seccion del curso, crear el curso
  const [text, setText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState([
    {
      id: 1,
      question: "¿Esta es la pregunta 1?",
      options: [
        { id: 1, text: "Sí", activa: false },
        { id: 2, text: "No", activa: false },
        { id: 3, text: "No estoy seguro", activa: false },
      ],
      respuesta: "",
    },
    {
      id: 2,
      question: "¿Esta es la pregunta 2?",
      options: [
        { id: 1, text: "Opción A", activa: false },
        { id: 2, text: "Opción B", activa: false },
        { id: 3, text: "Opción C", activa: false },
      ],
      respuesta: "",
    },
  ]);
  const [stateSelection, setStateSelection] = useState("0");
  const [section, setSection] = useState([
    {
      id: 0,
      type: "default",
      content: "",
    },
    {
      id: 1,
      type: "activity",
      content: "",
    },
  ]);
  const [position, setPosition] = useState(0);
  const [courseInfoAdd, setCourseInfoAdd] = useState([
    {
      id: 1,
      title: "Introduccion",
      sections: null,
      dataActivity: [],
      dataQuill: "",
      position: 0,
    },
  ]);
  const [courseInfo, setCourseInfo] = useState([
    {
      id: 1,
      title: "Introduccion",
      sections: null,
      dataActivity: [],
      dataQuill: "",
      position: 0,
    },
  ]);
  const [nameCurse, setNameCurse] = useState("");
  const [idCurse, setIdCurse] = useState("");
  const [cursesAll, setCursesAll] = useState(null);
  const [curseSelectect, seCurseSelectect] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [printer, setPrinter] = useState(null);
  const [printers, setPrinters] = useState([]);
  const [printerSelectect, setPrinterSelectect] = useState("");
  const [reload, setReload] = useState(false);
  const [reloadPrinter, setReloadPrinter] = useState(false);
  const [idPrinter, setId] = useState("");
  const navigate = useNavigate();

  //seccion del curso, editar el curso
  useEffect(() => {
    const fetchCurses = async () => {
      try {
        const response = await getDataCursesAll(token);
        setCursesAll(response.data);
        setReload(false);
      } catch (error) {
        setReload(false);
        console.error("Error al obtener los cursos:", error);
      }
    };
    if (token) {
      fetchCurses();
    }
  }, [reload, user, token]);
  useEffect(() => {
    const fetchCurse = async () => {
      try {
        const response = await getDataCurses(idCurse, token );
        setCourseInfo(response.data);
        setReload(false);
      } catch (error) {
        console.error("Error al obtener la impresora:", error);
        setReload(false);
      }
    };
    if (token && idCurse) {
      fetchCurse();
    }
  }, [user, token, idCurse]);
  const handleAddyCurseToBD = async () => {
    try {
      await addCurseToBD(nameCurse, courseInfoAdd, user.uid, token);
      setSnackbarMessage("Curso agregado exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setReload(true);
      navigate("/cursos");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error al agregar el curso. Por favor, intenta nuevamente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleDeleteCurse = async () => {
    try {
      console.log("eliminando: " + curseSelectect);
      await deleteCurseFromBD(curseSelectect, token);
      setReload(true);
      setSnackbarMessage("Curso eliminado exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpen(false);
      navigate("/cursos");
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      setSnackbarMessage(
        "Error al eliminar el curso. Por favor, intenta nuevamente."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleEditCourse = async () => {
    try {
      // Validar los datos antes de editar el curso
      if (!nameCurse.trim()) {
        setSnackbarMessage("El nombre del curso no puede estar vacío.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
  
      if (courseInfo.length === 0) {
        setSnackbarMessage("El curso debe tener al menos una sección.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
  
      await editCurseToBD(idCurse, nameCurse, courseInfo, user.uid, token);
      setReload(true);
      setSnackbarMessage("Curso editado exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/cursos");
    } catch (error) {
      console.error("Error al editar el curso:", error);
      setSnackbarMessage(
        "Error al editar el curso. Por favor, intenta nuevamente."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  //seccion para las impresoras
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await getDataPrinters(token);
        setPrinters(response.data);
        setReloadPrinter(false);
      } catch (error) {
        setReload(false);
        console.error("Error al obtener las impresoras:", error);
      }
    };
    if (token) {
      fetchPrinters();
    }
  }, [user, token, reloadPrinter]);
  useEffect(() => {
    const fetchPrinter = async () => {
      
      try {
        const response = await getDataPrinter(token, idPrinter);
        console.log("consultamos: " + JSON.stringify(response));
        setPrinter(response.data);
        setReload(false);
      } catch (error) {
        console.error("Error al obtener la impresora:", error);
        setReload(false);
      }
    };
    if (token && idPrinter) {
      fetchPrinter();
    }
  }, [user, token, idPrinter]);
  const [printerData, setPrinterData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    specs: [""],
    buyLinks: [{ name: "", url: "" }],
    images: [],
  });
  const handleCreatePrinter = async () => {
    try {
      // Validar los datos antes de crear la impresora
      if (
        !printerData.name.trim() ||
        !printerData.shortDescription.trim() ||
        !printerData.description.trim()
      ) {
        setSnackbarMessage(
          "El nombre y las descripciones no pueden estar vacíos."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (printerData.specs.length < 3) {
        setSnackbarMessage("Debe haber al menos 3 especificaciones.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (printerData.buyLinks.length < 2) {
        setSnackbarMessage("Debe haber al menos 2 enlaces de compra.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (printerData.images.length < 1 || printerData.images.length > 4) {
        setSnackbarMessage("Debe haber entre 1 y 4 imágenes.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      await addPrinterToBD(printerData, token);
      setReloadPrinter(true);
      setPrinterData({
        name: "",
        shortDescription: "",
        description: "",
        specs: [""],
        buyLinks: [{ name: "", url: "" }],
        images: [],
      });
      setSnackbarMessage("Impresora creada exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/impresoras");
    } catch (error) {
      console.error("Error al crear la impresora:", error);
      setSnackbarMessage(
        "Error al crear la impresora. Por favor, intenta nuevamente."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleEditPrinter = async () => {
    try {
      // Validar los datos antes de crear la impresora
      if (
        !printer.name.trim() ||
        !printer.shortDescription.trim() ||
        !printer.description.trim()
      ) {
        setSnackbarMessage(
          "El nombre y las descripciones no pueden estar vacíos."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (printer.specs.length < 3) {
        setSnackbarMessage("Debe haber al menos 3 especificaciones.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (printer.buyLinks.length < 2) {
        setSnackbarMessage("Debe haber al menos 2 enlaces de compra.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (printer.images.length < 1 || printerData.images.length > 4) {
        setSnackbarMessage("Debe haber entre 1 y 4 imágenes.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      await editPrinterInBD(printer, token, idPrinter);
      setReload(true);
      setSnackbarMessage("Impresora Editada exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al editar la impresora:", error);
      setSnackbarMessage(
        "Error al editar la impresora. Por favor, intenta nuevamente."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleDeletePrinter = async () => {
    try {
      await deletePrinterFromBD(printerSelectect, token);
      setReloadPrinter(true);
      setOpen(false)
      setSnackbarMessage("Impresora eliminada exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/impresoras");
      
    } catch (error) {
      console.error("Error al eliminar la impresora:", error);
      setSnackbarMessage(
        "Error al eliminar la impresora. Por favor, intenta nuevamente."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Routes>
      {/* Rutas para usuarios autenticados */}
      <Route
        path="/"
        element={<Home printers={printers} dataCurses={cursesAll} />}
      />
      <Route path="/guia-practica" element={<Guide />} />
      <Route path="/perfil" element={<ProfileAdmin />} />
      <Route
        path="/impresoras"
        element={
          <MainContainerPrintAdmin>
            <MainContentPrintAdmin>
              <AllPrintersAdmin
                printers={printers}
                printerSelectect={printerSelectect}
                setPrinterSelectect={setPrinterSelectect}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                
              />
            </MainContentPrintAdmin>
            <SettingsPrinterAdmin
              printers={printers}
              printerSelectect={printerSelectect}
              setPrinterSelectect={setPrinterSelectect}
              handleDeletePrinter={handleDeletePrinter}
              open={open} 
              setOpen={setOpen}
            />
          </MainContainerPrintAdmin>
        }
      />
      <Route
        path="/impresoras/create"
        element={
          <MainContainerPrintAdmin>
            <MainContentPrintAdmin>
              <CreatePrintAdmin
                printerData={printerData}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                handleSnackbarClose={handleSnackbarClose}
              />
            </MainContentPrintAdmin>
            <SettingsCreateAdmin
              printerData={printerData}
              setPrinterData={setPrinterData}
              handleCreatePrinter={handleCreatePrinter}
            />
          </MainContainerPrintAdmin>
        }
      />
      <Route
        path="/impresora/edit/:id"
        element={
          <MainContainerEditCurseAdmin>
            <MainContentEditCurseAdmin>
              <EditPrintAdmin
                printer={printer}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                handleSnackbarClose={handleSnackbarClose}
                setId={setId}
              />
            </MainContentEditCurseAdmin>
            <SettingsEditPrinter
              printerData={printer}
              setPrinterData={setPrinter}
              handleEditPrinter={handleEditPrinter}
            />
          </MainContainerEditCurseAdmin>
        }
      />
      <Route
        path="/cursos"
        element={
          <MainContainerCurseAdmin>
            <MainContentCurseAdmin>
              <AllCursesAdmin
                cursesAll={cursesAll}
                curseSelectect={curseSelectect}
                seCurseSelectect={seCurseSelectect}
                snackbarOpen={snackbarOpen}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                handleSnackbarClose={handleSnackbarClose}
              />
            </MainContentCurseAdmin>
            <SettingsCursesAdmin
              curseSelectect={curseSelectect}
              seCurseSelectect={seCurseSelectect}
              handleDeleteCurse={handleDeleteCurse}
              open={open} 
              setOpen={setOpen}
            />
          </MainContainerCurseAdmin>
        }
      />
      <Route path="/curso/:id" element={<LayoutRealizateCurse />} />
      <Route
        path="curso/edit/:id"
        element={
          <MainContainerEditCurseAdmin>
            <MainContentEditCurseAdmin>
              <EditCurseAdmin
                selections={section}
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                position={position}
                stateSelection={stateSelection}
                setStateSelection={setStateSelection}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                text={text}
                setText={setText}
                setIdCurse={setIdCurse}
                snackbarOpen={snackbarOpen}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                handleSnackbarClose={handleSnackbarClose}
              />
            </MainContentEditCurseAdmin>
            <ContentCurseAdmin
              position={position}
              setPosition={setPosition}
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              setNameCurse={setNameCurse}
              text={text}
              setText={setText}
              stateSelection={stateSelection}
              handleEditCourse={handleEditCourse}
            />
          </MainContainerEditCurseAdmin>
        }
      />
      <Route
        path="/crear-curso"
        element={
          <MainContainerCreateCurse>
            <MainContentCreateCurse>
              <CreateCurse
                selections={section}
                courseInfo={courseInfoAdd}
                setCourseInfo={setCourseInfoAdd}
                position={position}
                stateSelection={stateSelection}
                setStateSelection={setStateSelection}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                text={text}
                setText={setText}
                snackbarOpen={snackbarOpen}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                handleSnackbarClose={handleSnackbarClose}
                save={save} 
                setSave={setSave}
              />
            </MainContentCreateCurse>
            <ContentCurse
              position={position}
              setPosition={setPosition}
              courseInfo={courseInfoAdd}
              setCourseInfo={setCourseInfoAdd}
              nameCurse={nameCurse}
              setNameCurse={setNameCurse}
              text={text}
              setText={setText}
              stateSelection={stateSelection}
              handleAddyCurseToBD={handleAddyCurseToBD}
            />
          </MainContainerCreateCurse>
        }
      />
      <Route path="/article-section" element={<ArticleSection />} />
      <Route path="/basic-concepts" element={<BasicConcepts />} />
    </Routes>
  );
}
