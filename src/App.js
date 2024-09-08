import './App.css';
import Formulario from './components/form/formulario';
import PersonasList from './components/PersonaList/PersonaList';
import { fetchPersonas } from './services/apiService';
import { useState, useEffect } from 'react';


function App() {

  const [personas, setPersonas] = useState([]);

    const updatePersonas = async () => {
        try {
            const personasData = await fetchPersonas();
            setPersonas(personasData);
        } catch (error) {
            console.log("Error al cargar las personas: ", error);
        }
    };

    useEffect(() => {
        updatePersonas();
    }, []);


  return (
    <div className="App">
      <h1>Crear Persona</h1>
      <Formulario updatePersonas = {updatePersonas}/>
      <PersonasList personas = {personas} updatePersonas = {updatePersonas}/>
    </div>
  );
}

export default App;
