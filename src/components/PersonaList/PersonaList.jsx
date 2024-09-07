import React from 'react';
import './PersonaList.css';

const PersonasList = ({ personas }) => {
    return (
        <div>
            <h1>Lista de Personas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>País</th>
                        <th>Estado</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonasList;
