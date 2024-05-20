import React from 'react';
import '../assets/scss/basicconcepts.scss';
import Img1 from '../assets/img/impresora_1.jpeg';
import Img2 from '../assets/img/impresora_2.jpeg';
import Img3 from '../assets/img/impresora_3.jpeg';
const BasicConcepts = () => {
  const mode = "ModeLight";

  return (
    <div className={"GM__" + mode + "__main-conceptos-basicos"}>
      <h2 className={"GM__" + mode + "__main-conceptos-basicos-titulo"}>Conceptos Básicos de Impresoras 3D</h2>
      <div className={"GM__" + mode + "__main-conceptos-basicos-contenido"}>
        <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-video"}>
          <iframe src="https://www.youtube.com/watch?v=_JkDVRoC9ww" title="Video de conceptos básicos"></iframe>
        </div>
        <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas"}>
          <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta"}>
            <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-imagen"}>
              <img src={Img1} alt="Imagen 1" />
            </div>
            <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-contenido"}>
              <h3 className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjetas-tarjeta-titulo"}>¿Qué es una impresora 3D?</h3>
              <p className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-descripcion"}>
                Una impresora 3D es un dispositivo que permite crear objetos tridimensionales a partir de un modelo digital. Utiliza técnicas de fabricación aditiva para depositar material capa por capa hasta formar el objeto deseado.
              </p>
              <a href={"/que-es-impresora-3d"} className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-enlace"}>Leer más</a>
            </div>
          </div>
          <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta"}>
            <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-imagen"}>
              <img src={Img2} alt="Imagen 2" />
            </div>
            <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-contenido"}>
              <h3 className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-titulo"}>Usos de las impresoras 3D</h3>
              <p className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-descripcion"}>
                Las impresoras 3D tienen una amplia gama de aplicaciones, desde la creación de prototipos y modelos en la industria hasta la fabricación de productos personalizados, piezas de repuesto y objetos decorativos.
              </p>
              <a href="/usos-impresoras-3d" className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-enlace"}>Leer más</a>
            </div>
          </div>
          <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta"}>
            <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-imagen"}>
              <img src={Img3} alt="Imagen 3" />
            </div>
            <div className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-contenido"}>
              <h3 className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-titulo"}>Campos de aplicación</h3>
              <p className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-descripcion"}>
                Las impresoras 3D se utilizan en diversos campos, como la medicina, la arquitectura, la ingeniería, la moda, el arte y la educación. Su versatilidad las convierte en una herramienta valiosa en múltiples industrias.
              </p>
              <a href="/campos-aplicacion-impresoras-3d" className={"GM__" + mode + "__main-conceptos-basicos-contenido-tarjetas-tarjeta-enlace"}>Leer más</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicConcepts;