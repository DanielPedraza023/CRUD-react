import React, { useEffect, useState } from "react";
import axios from "axios";
import "./formulario.css";




const Formulario = () => {

    const [paises, setPaises] = useState([]);

    useEffect(() =>{
        //obtener la lista desde el backend
        axios.get('http://localhost:8080/pais')
        .then(response =>{
            setPaises(response.data);
        })
        .catch(error =>{
            console.log("Hubo un error al obtener los paises ", error)
        });
    }, []);



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
        <select
            id = "pais"
            className="form-control">
            <option value="">Selecciona un pais</option>
            {paises.map(pais => (
                <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                </option>
            ))}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
    </div>
  );
};

export default Formulario;
