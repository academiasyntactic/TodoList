import React from "react";
import FormTodo from "./FormTodo";
import { useState } from "react";

const Container = () => {
  const [tareas, setTareas] = useState([{ id: 1, descripcion: "Lavar baño" }]);

  const agregarTareaNueva = (tareaNueva) => {
    setTareas([...tareas, tareaNueva]);
  };
  const eliminarTarea = (tareaId)=>{
    let tareasNuevas = tareas.filter((todo)=>todo.id !== tareaId)
    setTareas(tareasNuevas)
  }

  return (
    <div>
      <h1>Contenedor</h1>
      <FormTodo agregarTareaNueva={agregarTareaNueva} />
      {tareas.map((elemento) => (
        <div
          key={elemento.id}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <h2>{elemento.descripcion}</h2>
          <button onClick={()=>eliminarTarea(elemento.id)} style={{ height: "45px" }}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Container;
