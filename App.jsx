import React, { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);

  // Función para agregar una nueva tarea
  const agregarTarea = (textoTarea) => {
    const nuevaTarea = { id: Date.now(), texto: textoTarea };
    setTareas([...tareas, nuevaTarea]);
  };

  // Función para eliminar una tarea individual
  const eliminarTarea = (idTarea) => {
    setTareas(tareas.filter((tarea) => tarea.id !== idTarea));
  };

  // Función para eliminar todas las tareas
  const eliminarTodasLasTareas = () => {
    setTareas([]);
  };

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <ContadorTareas cantidad={tareas.length} />
      <ListaTareas tareas={tareas} onDeleteTarea={eliminarTarea} />
      <button onClick={eliminarTodasLasTareas}>
        Eliminar todas las tareas
      </button>
      <FormularioTarea onAgregarTarea={agregarTarea} />
    </div>
  );
}

// Componente para mostrar el contador de tareas
function ContadorTareas({ cantidad }) {
  return <p>Tareas pendientes: {cantidad}</p>;
}

// Componente para mostrar la lista de tareas
function ListaTareas({ tareas, onDeleteTarea }) {
  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id}>
          {tarea.texto}
          <button onClick={() => onDeleteTarea(tarea.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

// Componente para agregar nuevas tareas
function FormularioTarea({ onAgregarTarea }) {
  const [textoTarea, setTextoTarea] = useState('');

  const handleChange = (event) => {
    setTextoTarea(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textoTarea.trim()) {
      onAgregarTarea(textoTarea);
      setTextoTarea('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <input type="text" value={textoTarea} onChange={handleChange} />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default App;
