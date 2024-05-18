import React from "react";
import { useState } from "react";

const FormTodo = ({ agregarTareaNueva }) => {
  const [tarea, setTarea] = useState(null);//creacion de estado que almacena lo que se escribe.

  const cambioInput = (e) => {
    e.preventDefault();//previene que se recargue la pagina
    agregarTareaNueva({//prop recibido de componente padre, es una funcion que recibe como parametro un objeto.
      id: Math.floor(Math.random() * 1000),
      descripcion: tarea,
    });
  };

  return (
    <div>
      <form onSubmit={cambioInput}>
        <input type="text" onChange={(hola) => setTarea(hola.target.value)} />
        <button>Agregar</button>
      </form>
    </div>
  );
};

export default FormTodo;
