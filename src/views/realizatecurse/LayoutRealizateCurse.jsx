import React, { useEffect, useState } from "react";
import SeeCurse from "./RealizateCurse";
import MainContainerSeeCurse from "./MainContainerRealizateCurse";
import MainContentSeeCurse from "./MainContentRealizateCurse";
import SeeContentCurse from "./RealizateContentCurse";
import { useParams } from "react-router-dom";
import { getDataCurses, getDataCursesUser } from "../../services";
import { UserAuth } from "../../hooks/auth/Auth.Provider";

export default function LayoutRealizateCurse() {
  const [loading, setLoading] = useState(true);
  const { user, token, tokenLoading } = UserAuth();
  const { id } = useParams();
  const [actualizar, setActualizar] = useState(false);

  const [text, setText] = useState(
    "Esta seccion no cuenta con esta informacion, prueba verificando con la seccion de actividades :)"
  );
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
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseInfoUser, setCourseInfoUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenNow = await token;
        const response = await getDataCurses(id, tokenNow);
        setCourseInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [actualizar, token]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenNow = await token;
        const response = await getDataCursesUser(id, user.uid, tokenNow);
        setCourseInfoUser(response.data);
        setActualizar(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [actualizar, token]);
  if (loading || tokenLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <MainContainerSeeCurse>
      <MainContentSeeCurse>
        {courseInfoUser &&
        courseInfoUser.length > 0 &&
        courseInfoUser[0].datos &&
        courseInfoUser[0].datos.estateCurse ? (
          <div>Curso finalizado!!</div>
        ) : (
          <SeeCurse
            text={text}
            section={section}
            courseInfo={courseInfo}
            position={position}
            setPosition={setPosition}
            stateSelection={stateSelection}
            setStateSelection={setStateSelection}
            courseInfoUser={courseInfoUser}
            setActualizar={setActualizar}
          />
        )}
      </MainContentSeeCurse>
      <SeeContentCurse
        position={position}
        setPosition={setPosition}
        courseInfo={courseInfo}
      />
    </MainContainerSeeCurse>
  );
}
