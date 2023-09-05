// Reparto.tsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import RepartoCard from "../components/CardActor";  // Asegúrate de tener este componente para visualizar cada miembro del reparto
import RepartoForm from "../components/RepartoForm";  // Asegúrate de importar RepartoForm

interface Reparto {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  imagen: string;
  biografia: string;
  nacionalidad: string;
}

interface RepartoProps {
  initialReparto: Reparto[];
}

const Repartos: React.FC<RepartoProps> = ({ initialReparto }) => {
  const { data } = useData();
  const repartos = Array.isArray(data.reparto)
    ? data.reparto
    : Array.isArray(initialReparto)
    ? initialReparto
    : [];

  // Estado para controlar si el formulario está visible o no
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Agregar nuevo miembro al reparto"}
      </button>

      {/* Si showForm es true, se muestra el formulario */}
      {showForm && <RepartoForm />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(repartos) &&
          repartos.map((reparto: Reparto) => (
            <RepartoCard key={reparto.id} reparto={reparto} />
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/reparto");
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("La respuesta del servidor no es un array", data);
    return {
      props: {
        initialReparto: [],
      },
    };
  }

  return {
    props: {
      initialReparto: data,
    },
  };
}

export default Repartos;
