import React, { useContext } from "react";
import {
  Cottage,
  Expand,
  Newspaper,
  SportsEsports,
  TextSnippet,
} from "@mui/icons-material";
import LayautContext from "../../../hooks/layout/types/Layout.Contex";
import { useNavigate, useLocation } from "react-router-dom";

export default function LefNav() {
  const layout$ = useContext(LayautContext);
  const { onShowHideleftNav, show, modeNative } = layout$;
  const navigate = useNavigate();
  const location = useLocation();

  function onClickAllRoutes() {
    onShowHideleftNav();
  }

  function handleNavigation(route) {
    switch (route) {
      case "/":
        navigate("/");
        break;
      case "/guia-practica":
        navigate("/guia-practica");
        break;
      case "/basic-concepts":
        navigate("/basic-concepts");
        break;
      case "/article-section":
        navigate("/article-section");
        break;
      default:
        break;
    }
  }

  let allRoutes = show ? "-all" : "";
  let mode = modeNative ? "ModeNight" : "ModeLight";

  return (
    <nav className={`GM__${mode}__leftnav${allRoutes}`}>
      <ul>
        <li>
          <div
            onClick={onClickAllRoutes}
            className={`GM__${mode}__leftnav${allRoutes}-route`}
          >
            <div className={`GM__${mode}__leftnav${allRoutes}-route-icon-title`}>
              <Expand />
            </div>
            <div className={`GM__${mode}__leftnav${allRoutes}-route-title`}>
              <h6>Espero y pases un rato agradable :3</h6>
            </div>
          </div>
        </li>
        <li className={location.pathname === "/" ? "active" : ""}>
          <div
            onClick={() => handleNavigation("/")}
            className={`GM__${mode}__leftnav${allRoutes}-route`}
          >
            <div className={`GM__${mode}__leftnav${allRoutes}-route-icon`}>
              <Cottage />
            </div>
            <div className={`GM__${mode}__leftnav${allRoutes}-route-title`}>
              <h6>Home</h6>
            </div>
          </div>
        </li>
        <li className={location.pathname === "/guia-practica" ? "active" : ""}>
          <div
            onClick={() => handleNavigation("/guia-practica")}
            className={`GM__${mode}__leftnav${allRoutes}-route`}
          >
            <div className={`GM__${mode}__leftnav${allRoutes}-route-icon`}>
              <SportsEsports />
            </div>
            <div className={`GM__${mode}__leftnav${allRoutes}-route-title`}>
              <h6>Guia y practica</h6>
            </div>
          </div>
        </li>
        <li className={location.pathname === "/basic-concepts" ? "active" : ""}>
          <div
            onClick={() => handleNavigation("/basic-concepts")}
            className={`GM__${mode}__leftnav${allRoutes}-route`}
          >
            <div className={`GM__${mode}__leftnav${allRoutes}-route-icon`}>
              <TextSnippet />
            </div>
            <div className={`GM__${mode}__leftnav${allRoutes}-route-title`}>
              <h6>Conceptos basicos</h6>
            </div>
          </div>
        </li>
        <li
          className={location.pathname === "/article-section" ? "active" : ""}
        >
          <div
            onClick={() => handleNavigation("/article-section")}
            className={`GM__${mode}__leftnav${allRoutes}-route`}
          >
            <div className={`GM__${mode}__leftnav${allRoutes}-route-icon`}>
              <Newspaper />
            </div>
            <div className={`GM__${mode}__leftnav${allRoutes}-route-title`}>
              <h6>Articulos</h6>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
