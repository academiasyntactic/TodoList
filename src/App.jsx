import { useState } from "react";
import Container from "./components/Container";
import { app } from "./firebase/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect } from "react";

function App() {
  const [productos, setProductos] = useState(null);
  const db = getFirestore(app); //2do paso, "conectarnos" a bd

  useEffect(() => {
    const fetch = async () => {
      const vector = await getDocs(collection(db, "productos"));
      // console.log(vector)
      const gafas = vector.docs.map((elemento) => ({
        datos: elemento.data(),
        id: elemento.id,
      }));
      setProductos(gafas);
    };
    fetch();
  }, []);

  return (
    <div>
      <Container />
      <button onClick={fetch}>Firebase</button>
      <ul>
        {productos && productos.length > 0
          ? productos.map((elemento) => (
              <li key={elemento.id}>{elemento.datos.nombre}</li>
            ))
          : (<div className="animate-spin w-32 ">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>)}
      </ul>
    </div>
  );
}

export default App;
