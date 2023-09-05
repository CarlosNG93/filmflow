// Directores.tsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import DirectorCard from "../components/CardDir";
import DirectorForm from "../components/DirectorForm"; // Asegúrate de importar DirectorForm

interface Director {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  imagen: string;
  biografia: string;
  nacionalidad: string;
}

interface DirectoresProps {
  initialDirectores: Director[];
}

const Directores: React.FC<DirectoresProps> = ({ initialDirectores }) => {
  const { data } = useData();
  const directores = Array.isArray(data.directores)
    ? data.directores
    : Array.isArray(initialDirectores)
    ? initialDirectores
    : [];

  // Estado para controlar si el formulario está visible o no
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Agregar nuevo director"}
      </button>

      {/* Si showForm es true, se muestra el formulario */}
      {showForm && <DirectorForm />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(directores) &&
          directores.map((director: Director) => (
            <DirectorCard key={director.id} director={director} />
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/directores");
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("La respuesta del servidor no es un array", data);
    return {
      props: {
        initialDirectores: [],
      },
    };
  }

  return {
    props: {
      initialDirectores: data,
    },
  };
}

export default Directores;
