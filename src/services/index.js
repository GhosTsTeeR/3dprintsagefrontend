import axios from "axios";
import { storage } from "../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export async function chatBotResponse(question) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/chat-bot/chat`,
      method: "POST",
      data: { question },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
export async function getDataUser(uid, token) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/user/data-user/${uid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message, // O cualquier otra propiedad que desees devolver
      };
    } else if (error.request) {
      // Si no hay respuesta en el error, pero hubo una solicitud, significa que se envió la solicitud pero no se recibió respuesta
      return {
        status: 500, // Por ejemplo, puedes devolver un código de estado interno del servidor (500)
        message: "Error interno del servidor", // O un mensaje genérico de error
      };
    } else {
      // Si no hay ni respuesta ni solicitud en el error, podría ser por algún otro motivo, como un error de red
      return {
        status: 500,
        message: "Error desconocido, ¡genera un reporte!",
      };
    }
  }
}

export async function ModifyDataUser(uderData, uid, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/user/modify-data-user/${uid}`,
      method: "POST",
      data: uderData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function addPrinterToBD(printerData, token) {
  try {
    // Subir las imágenes a Firebase Storage
    const imageUrls = await Promise.all(
      printerData.images.map(async (image) => {
        const imageRef = ref(storage, `print_img/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      })
    );

    // Crear un nuevo objeto con los datos de la impresora y las URLs de las imágenes
    const printerDataWithImageUrls = {
      ...printerData,
      images: imageUrls,
    };

    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/printers/add-printer-to-bd`,
      method: "POST",
      data: printerDataWithImageUrls,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al agregar la impresora:", error);
    throw error;
  }
}
export async function editPrinterInBD(printerData, token, id) {
  try {
    // Obtener las URLs de las imágenes existentes
    const existingImageUrls = printerData.images.filter(
      (image) => typeof image === "string"
    );

    // Subir las nuevas imágenes a Firebase Storage
    const newImageUrls = await Promise.all(
      printerData.images
        .filter((image) => typeof image !== "string")
        .map(async (image) => {
          const imageRef = ref(
            storage,
            `print_img/${Date.now()}_${image.name}`
          );
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
    );

    // Combinar las URLs de las imágenes existentes y las nuevas
    const updatedImageUrls = [...existingImageUrls, ...newImageUrls];

    // Crear un nuevo objeto con los datos actualizados de la impresora
    const updatedPrinterData = {
      ...printerData,
      images: updatedImageUrls,
    };

    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/printers/edit-printer/${id}`,
      method: "PUT",
      data: updatedPrinterData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al editar la impresora:", error);
    throw error;
  }
}
export async function getDataPrinters(token) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/printers/get-all-printers`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function getDataPrinter(token, id) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/printers/get-printer/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function deletePrinterFromBD(printerId, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/printers/delete-printer/${printerId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al eliminar la impresora:", error);
    throw error;
  }
}
export async function addCurseToBD(name, data, uid, token) {
  console.log(data);
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/add-curse-to-bd/${uid}`,
      method: "POST",
      data: { name, data, uid },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function editCurseToBD(id, name, data, uid, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/edit-curse/${id}`,
      method: "PUT",
      data: { name, data, uid },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteCurseFromBD(id, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/delete-curse/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function modifyDataCurseUser(id, uid, position, estado) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/modify-data-curse-user/${uid}`,
      method: "POST",
      data: { id, position, estado },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function getDataCurses(id, token) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/curses/data-curse/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function getDataCursesAll(token) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/curses/data-curse-all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function getDataCursesUser(id, idUser, token) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/curses/data-curse-user/${id}?userId=${idUser}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function addDataCurseUser(id, uid, name, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/add-data-curse-user/${uid}`,
      method: "POST",
      data: { id, name },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export async function getCurseInfoUser(uid, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/get-curse-info-user/${uid}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function addFinalizateCurseUser(id, uid, stateCurse, token) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_SERVER}/curses/add-finalizate-curse-user/${uid}`,
      method: "POST",
      data: { id, stateCurse },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
