import React, { useEffect, useState } from "react";
import { fetchPaises, fethEstados, savePersona } from "../../services/apiService";
import "./formulario.css";

const Formulario = ( {updatePersonas} ) => {

    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");

    const [formValid, setFormValid] = useState(false); //Para controlar el boton de guardar

    // Validar si el formulario está completo
    useEffect(() => {
      if (nombre && apellido && edad && paisSeleccionado && estadoSeleccionado) {
          setFormValid(true);
      } else {
          setFormValid(false);
      }
    }, [nombre, apellido, edad, paisSeleccionado, estadoSeleccionado]);

    useEffect(() => {
        const cargarPaises = async () => {
            try {
                const paisesData = await fetchPaises();
                setPaises(paisesData);
            } catch (error) {
                console.log("Error al cargar los países: ", error);
            }
        }
        cargarPaises();
    }, []);

    useEffect(() => {
        const cargarEstados = async () => {
            if (paisSeleccionado) {
                try {
                    const estadosData = await fethEstados(paisSeleccionado);
                    setEstados(estadosData);
                } catch (error) {
                    console.log("Error al cargar los estados: ", error);
                }
            } else {
                setEstados([]);
            }
        }
        cargarEstados();
    }, [paisSeleccionado]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !apellido || !edad || !paisSeleccionado || !estadoSeleccionado) {
            alert("Por favor, complete todos los campos");
            return;
        }

        try {
            await savePersona({
                nombre,
                apellido,
                edad: parseInt(edad),
                pais: { id: paisSeleccionado },
                estado: { id: estadoSeleccionado } // Incluyendo el estado
            });

            await updatePersonas(); //Actualizar personas

            setNombre("");
            setApellido("");
            setEdad("");
            setPaisSeleccionado("");
            setEstadoSeleccionado(""); // Reiniciar la selección del estado
            setEstados([]);
            alert("Persona creada con éxito");
        } catch (error) {
            console.log("Error al enviar el formulario: ", error);
            throw error;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Ingrese su nombre"
                        value={nombre || ""}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        placeholder="Ingrese su apellido"
                        value={apellido || ""}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Edad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        placeholder="Ingrese su edad"
                        value={edad || ""}
                        onChange={(e) => setEdad(parseInt(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>País</label>
                    <select onChange={(e) => setPaisSeleccionado(e.target.value)} value={paisSeleccionado || ""}>
                        <option value="">Seleccione un país</option>
                        {paises.map(pais => (
                            <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado o región</label>
                    <select onChange={(e) => setEstadoSeleccionado(e.target.value)} value={estadoSeleccionado || ""}>
                        <option value="">Seleccione un estado</option>
                        {estados.map(estado => (
                            <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" disabled = {!formValid} >Guardar</button>
            </form>
        </div>
    );
};

export default Formulario;
