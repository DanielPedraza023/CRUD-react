import axios from "axios";  

const Api_URL = "http://localhost:8080";

export const fectchPaises = async () => {
    try{
        const response = await axios.get(`${Api_URL}/pais`);
        return response.data;
    }
    catch(error){
        console.error("Error al cargar los paises: ",error);
        throw error
    }
}; 

export const fecthEstados = async (paisId) => {
    try {
        const response = await axios.get(`${Api_URL}/estados/${paisId}`)
        return response.data;
    }
    catch(error){
        console.log("Error al cargar los estados: ", error)
        throw error
    }
};

