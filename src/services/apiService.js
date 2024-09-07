import axios from "axios";  

const Api_URL = "http://localhost:8080";

export const fetchPaises = async () => {
    try{
        const response = await axios.get(`${Api_URL}/pais`);
        return response.data;
    }
    catch(error){
        console.error("Error al cargar los paises: ",error);
        throw error
    }
}; 

export const fethEstados = async (paisId) => {
    try {
        const response = await axios.get(`${Api_URL}/estados/${paisId}`)
        return response.data;
    }
    catch(error){
        console.log("Error al cargar los estados: ", error)
        throw error
    }
};

export const fetchPersonas = async () => {
    try {
        const response = await axios.get(`${Api_URL}/personas/`)
        return response.data;
    }
    catch(error){
        console.log("Error al cargar las personas: ", error)
        throw error
    }
}

export const savePersona = async ({nombre, apellido, edad, pais, estado}) =>{
    try {
        const response = await axios.post(`${Api_URL}/personas/`, {
            nombre: nombre, 
            apellido: apellido,
            edad: edad, 
            pais: pais,
            estado: estado
        });
        return response.data;
    } catch(error) {
        console.log("Error al guardar la persona: ", error);
        throw error;
    }
};
