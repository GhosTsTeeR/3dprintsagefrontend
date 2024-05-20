import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Guide from "../views/Guide";
import Profile from "../views/Profile";
import MainContainerPrint from "../views/allprinters/MainContainerPrint";
import MainContentPrint from "../views/allprinters/MainContentPrint";
import SettingsCurses from "../views/allcurses/SettingsCurses";
import LayoutRealizateCurse from "../views/realizatecurse/LayoutRealizateCurse";
import ArticleSection from "../views/ArticleSection";
import BasicConcepts from "../views/BasicConcepts";
import {
  getDataCurses,
  getDataCursesAll,
  getDataPrinter,
  getDataPrinters,
} from "../services";
import { UserAuth } from "../hooks/auth/Auth.Provider";
import Home from "../views/Home";
import ViewPrinter from "../views/allprinters/ViewPrinter";
import SettingsPrinterDetails from "../views/allprinters/SettingsPrinterDetails";
import MainContainerPrintAdmin from "../views/allprintersadmin/MainContainerPrintAdmin";
import MainContentPrintAdmin from "../views/allprintersadmin/MainContentPrintAdmin";
import AllPrintersAdmin from "../views/allprintersadmin/AllPrintersAdmin";
import SettingsViewPrinters from "../views/allprinters/SettingsViewPrinters";
import MainContainerCurseAdmin from "../views/allcursesadmin/MainContainerCurseAdmin";
import MainContentCurseAdmin from "../views/allcursesadmin/MainContentCurseAdmin";
import AllCursesAdmin from "../views/allcursesadmin/AllCursesAdmin";

export default function RoutesUser() {
  const { user, token } = UserAuth();
  const [open, setOpen] = useState(false);

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
        const response = await getDataCurses(idCurse, token);
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
  }, [user, token, idPrinter, reloadPrinter, idPrinter]);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={<Home printers={printers} dataCurses={cursesAll} />}
      />
      <Route path="/guia-practica" element={<Guide />} />
      <Route path="/perfil" element={<Profile />} />
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
            <SettingsViewPrinters
              printers={printers}
              printerSelectect={printerSelectect}
              setPrinterSelectect={setPrinterSelectect}
              open={open}
              setOpen={setOpen}
            />
          </MainContainerPrintAdmin>
        }
      />
      <Route
        path="/impresora/:id"
        element={
          <MainContainerPrint>
            <MainContentPrint>
              <ViewPrinter printerData={printer} setId={setId} />
            </MainContentPrint>
            <SettingsPrinterDetails printerData={printer} />
          </MainContainerPrint>
        }
      />
      <Route path="/curso/:id" element={<LayoutRealizateCurse />} />
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
            <SettingsCurses
              curseSelectect={curseSelectect}
              seCurseSelectect={seCurseSelectect}
              open={open} 
              setOpen={setOpen}
            />
          </MainContainerCurseAdmin>
        }
      />
      <Route path="/article-section" element={<ArticleSection />} />
      <Route path="/basic-concepts" element={<BasicConcepts />} />
    </Routes>
  );
}
