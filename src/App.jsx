import { useState } from "react";
import Container from "./components/Container";
import { app } from "./firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect } from "react";

function App() {
  const [productos, setProductos] = useState(null);
  const [recargar, setRecargar] = useState(false);
  const [producto, setProducto] = useState({});
  const db = getFirestore(app); //2do paso, "conectarnos" a bd

  const borrarFirebase = async (idBorrado) => {
    const docRef = doc(db, "productos", idBorrado);
    deleteDoc(docRef)
      .then(() => {
        console.log("El documento se elimino");
      })
      .catch((error) => {
        console.log(error);
      });
    setRecargar(!recargar);
  };

  const agregarDocumento = async () => {
    const docRef = await addDoc(collection(db, "productos"), producto);
    console.log("Document written with ID: ", docRef.id);
    setRecargar(!recargar);
  };

  useEffect(() => {
    const fetch = async () => {
      const vector = await getDocs(collection(db, "productos"));
      const gafas = vector.docs.map((elemento) => ({
        ...elemento.data(),
        id: elemento.id,
      }));
      setProductos(gafas);
    };
    fetch();
  }, [recargar]);

  return (
    <div>
      <Container />
      <ul className="flex gap-5">
        {productos && productos.length > 0 ? (
          productos.map((elemento) => (
            <li
              key={elemento.id}
              className="flex flex-col items-center justify-center"
              onClick={() => console.log(elemento.imagen)}
            >
              <img src={elemento.imagen} className="w-48 " alt="" />
              {elemento.nombre}
              <h2>El precio es {elemento.precio} </h2>
              <button
                onClick={() => {
                  borrarFirebase(elemento.id);
                }}
                className="bg-red-600"
              >
                Borrar
              </button>
            </li>
          ))
        ) : (
          <div className="flex justify-center">
            <div className="animate-spin w-24 ">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        )}
      </ul>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="nombre"
          onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="imagen"
          onChange={(e) => setProducto({ ...producto, imagen: e.target.value })}
        />
        <input
          type="text"
          placeholder="precio"
          onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
        />
        <button onClick={agregarDocumento}>Agregar</button>
      </div>
    </div>
  );
}

export default App;
