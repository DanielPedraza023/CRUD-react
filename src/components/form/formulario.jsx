import React, { useEffect, useState } from "react";
import { fectchPaises, fecthEstados } from "../../services/apiService";
import "./formulario.css";


const Formulario = () => {

    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");


    useEffect(() =>{

        const cargarPaises = async () => {
            try{
                const paisesData = await fectchPaises();
                setPaises(paisesData);
            }
            catch(error){
                console.log("Error al cargar los paises: ", error)
            }
        }
        cargarPaises();
    },[]);
    
    useEffect(() =>{
        
        const cargarEstados = async () => {
            if(paisSeleccionado){
                try{
                    const estadosData = await fecthEstados(paisSeleccionado);
                    setEstados(estadosData);
                }
                catch(error){
                    console.log("Error al cargar los estados: ", error)
                }
            }
            else{
                setEstados([]);
            }
        }
        cargarEstados();
    },[paisSeleccionado]);


  return (
    <div>
    <form>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          placeholder="Ingrese su nombre"
        />
      </div>
      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          className="form-control"
          id="apellido"
          placeholder="Ingrese su apellido"
        />
      </div>
      <div className="form-group">
        <label>Edad</label>
        <input
          type="number"
          className="form-control"
          id="nombre"
          placeholder="Ingrese su edad"
        />
      </div>
      <div className="form-group">
                <label>País</label>
                <select onChange={(e) => setPaisSeleccionado(e.target.value)} value={paisSeleccionado}>
                    <option value="">Seleccione un país</option>
                    {paises.map(pais => (
                        <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                    ))}
                </select>
            </div>
      
      <div className="form-group">
                <label>Estado o region</label>
                <select>
                    <option value="">Seleccione un estado</option>
                    {estados.map(estado => (
                        <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                    ))}
                </select>
            </div>
        
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
    </div>
  );
};

export default Formulario;
