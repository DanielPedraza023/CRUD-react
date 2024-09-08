import React from 'react';
import './PersonaList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deletePersona } from '../../services/apiService';


const PersonasList = ({ personas, updatePersonas }) => {

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta persona?")) {
            try {
                await deletePersona(id);
                await updatePersonas(); // Actualiza la lista después de eliminar
                alert("Persona eliminada con éxito");
            } catch (error) {
                console.log("Error al eliminar la persona:", error);
            }
        }
    };


    return (
        <div>
            <h2>Lista de Personas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>País</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map(persona => (
                        <tr key={persona.id}>
                            <td>{persona.id}</td>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellido}</td>
                            <td>{persona.edad}</td>
                            <td>{persona.pais ? persona.pais.nombre : 'No disponible'}</td>
                            <td>{persona.estado ? persona.estado.nombre : 'No disponible'}</td>
                            <td>
                                <button type="button" className="btn btn-outline-success mr-2" >Editar</button>
                                <button type="button" className="btn btn-outline-danger" onClick={() => {handleEliminar(persona.id)}}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    );
};

export default PersonasList;
