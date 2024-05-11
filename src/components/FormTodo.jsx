import React from "react";
import { useState } from "react";

const FormTodo = ({agregarTareaNueva}) => {
  const [tarea, setTarea] = useState(null);

  const cambioInput = (e)=>{
    e.preventDefault();
    agregarTareaNueva({id:Math.floor(Math.random()*1000), descripcion: tarea})
  }

  return (
    <div>
      <form onSubmit={cambioInput}>
        <input type="text" onChange={(e)=>setTarea(e.target.value)} />
        <button>Agregar</button>
      </form>
    </div>
  );
};

export default FormTodo;
