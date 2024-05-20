import "./image-resize.css";
import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactImageMagnify from "react-image-magnify";
import ImageResize from "quill-image-resize-module--fix-imports-error";
Quill.register("modules/imageResize", ImageResize);

export default function QuillEditAdmin({
  alignment,
  formats,
  archive,
  setArchive,
  bullet,
  typeHeader,
  setTypeHeader,
  text,
  setText,
  position,
  courseInfo,
  setCourseInfo,
}) {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      quill.format("align", alignment);

      if (archive) {
        if (archive === "file") {
          setArchive();
          function openImageSelectModal() {
            return new Promise((resolve) => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.style.display = "none";

              input.onchange = (event) => {
                const file = event.target.files[0];
                resolve(file);
              };

              document.body.appendChild(input);

              // Simula un clic en el elemento de entrada de archivo
              input.click();
            });
          }

          openImageSelectModal().then((file) => {
            if (file) {
              const reader = new FileReader();
              setArchive();
              reader.onload = (event) => {
                const imageUrl = event.target.result;

                // Inserta la imagen en Quill
                const imageHtml = `<img class="quill-zoom-image" src="${imageUrl}" alt="User Image" />`;
                quill.clipboard.dangerouslyPasteHTML(
                  quill.getSelection().index,
                  imageHtml
                );
              };

              reader.readAsDataURL(file);
            } else {
              console.log("Error");
            }
          });
        } else if (archive === "link") {
          quill.format("link", true);
        }
      }

      quill.format("list", bullet);
      quill.format("header", typeHeader);

      // Desactiva los formatos que no están en la lista de formatos activos
      const activeFormats = formats.reduce((acc, format) => {
        quill.format(format, true);
        return { ...acc, [format]: true };
      }, {});

      // Recorre todos los formatos disponibles y los desactiva si no están activos
      const availableFormats = [
        "header1",
        "header2",
        "bold",
        "italic",
        "underline",
        "strike",
      ];
      availableFormats.forEach((format) => {
        if (!activeFormats[format]) {
          quill.format(format, false);
        }
      });
    }
  }, [alignment, formats, archive, bullet, typeHeader]);

  useEffect(() => {
    const quill = quillRef.current.getEditor();

    // Escucha los clics en las imágenes para mostrar la funcionalidad de zoom
    quill.container.querySelectorAll(".quill-zoom-image").forEach((img) => {
      img.onclick = () => {
        // Lógica para mostrar la imagen con zoom utilizando ReactImageMagnify
        // Puedes crear un estado y un componente adicional para manejar la visualización del zoom
        // cuando el usuario haga clic en una imagen.
      };
    });
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
    },
    imageResize: {
      modules: ["Resize", "DisplaySize"],
      handleStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
    },
  };

  const handleTextChange = (value) => {
    setCourseInfo((prevCourseInfo) => ({
      ...prevCourseInfo,
      data: prevCourseInfo.data.map((info) =>
        info.position === position ? { ...info, dataQuill: value } : info
      ),
    }));
  };

  const [item, setItem] = useState(
    courseInfo?.data?.find((i) => i.position === position)
  );

  useEffect(() => {
    if (courseInfo && Array.isArray(courseInfo.data)) {
      setItem(courseInfo.data.find((i) => i.position === position));
    }
  }, [position, courseInfo]);
  console.log(position, courseInfo);
  return (
    <div className="quill-editor-container">
      <ReactQuill
        ref={quillRef}
        value={item?.dataQuill}
        onChange={() => handleTextChange}
        modules={modules}
      />
    </div>
  );
}

QuillEditAdmin.propTypes = {
  alignment: PropTypes.string.isRequired,
  formats: PropTypes.array.isRequired,
  archive: PropTypes.any,
  setArchive: PropTypes.func.isRequired,
  bullet: PropTypes.string,
  typeHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  setTypeHeader: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  position: PropTypes.any.isRequired,
  courseInfo: PropTypes.any.isRequired,
  setCourseInfo: PropTypes.func.isRequired,
};