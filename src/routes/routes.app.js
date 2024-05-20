import React, {useEffect, useState } from "react";
import Home from "../views/Home";
import { Route, Routes } from "react-router-dom";
import Guide from "../views/Guide";
import MainContainerPrint from "../views/allprinters/MainContainerPrint";
import MainContentPrint from "../views/allprinters/MainContentPrint";
import AllCurses from "../views/allcurses/AllCurses";
import MainContainerCurse from "../views/allcurses/MainContainerCurse";
import MainContentCurse from "../views/allcurses/MainContentCurse";
import SettingsCurses from "../views/allcurses/SettingsCurses";
import LayoutSeeCurse from "../views/seecurse/LayoutSeeCurse";
import { getDataPrinter, getDataPrinters } from "../services";
import BasicConcepts from "../views/BasicConcepts";
import ArticleSection from "../views/ArticleSection";
import MainContainerPrintAdmin from "../views/allprintersadmin/MainContainerPrintAdmin";
import MainContentPrintAdmin from "../views/allprintersadmin/MainContentPrintAdmin";
import AllPrintersAdmin from "../views/allprintersadmin/AllPrintersAdmin";
import SettingsViewPrinters from "../views/allprinters/SettingsViewPrinters";
import SettingsPrinterDetails from "../views/allprinters/SettingsPrinterDetails";
import { UserAuth } from "../hooks/auth/Auth.Provider";
import ViewPrinter from "../views/allprinters/ViewPrinter";
import SearchView from "../views/SearchView";

export default function RoutesApp() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [printer, setPrinter] = useState(null);
  const [printers, setPrinters] = useState([]);
  const [printerSelectect, setPrinterSelectect] = useState("");
  const [reload, setReload] = useState(false);
  const [reloadPrinter, setReloadPrinter] = useState(false);
  const [idPrinter, setId] = useState("");
  const { user, token } = UserAuth();
  const [open, setOpen] = useState(false);
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
        fetchPrinters();
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
      if (idPrinter) {
        fetchPrinter();
      }
    }, [user, token, idPrinter, reloadPrinter, idPrinter]);
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  return (
    <Routes>
      {/* Rutas para usuarios no autenticados o con user null */}
      <Route path="/" element={<Home printers={printers} />} />
      <Route path="/guia-practica" element={<Guide />} />
      <Route path="/foro" element={<Home />} />
      <Route path="/curso/:id" element={<LayoutSeeCurse />} />
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
                setReloadPrinter={setReloadPrinter}
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
      <Route
        path="/cursos"
        element={
          <MainContainerCurse>
            <MainContentCurse>
              <AllCurses />
            </MainContentCurse>
            <SettingsCurses />
          </MainContainerCurse>
        }
      />
      <Route path="/article-section" element={<ArticleSection />} />
      <Route path="/basic-concepts" element={<BasicConcepts />} />
      <Route path="/search/:id" element={<SearchView printers={printers} />} />
    </Routes>
  );
}
