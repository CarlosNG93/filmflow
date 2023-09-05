// DirectorCard.tsx
import React from "react";

import { useData } from "../context/DataContext";

type Director = {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  nacionalidad: string;
  imagen: string;
  biografia: string;
};

type DirectorCardProps = {
  director: Director;
};

const DirectorCard: React.FC<DirectorCardProps> = ({ director }) => {
  const { data, deleteData, updateData } = useData();
  const directors = data.directores;
  const date = new Date(director.fechaNacimiento);

  const handleDeleteClick = async () => {
    const confirmation = window.confirm(
      "¿Estás seguro de que quieres borrar este director?"
    );
    if (confirmation) {
      try {
        
        await deleteData("directores", director.id, "directores");
        console.log("Director eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el director:", error);
      }
    }
  };
  

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg mt-7">
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover object-center"
          src={director.imagen}
          alt={director.nombre}
        />
      </div>
      <i
        className="fa fa-trash absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
        onClick={handleDeleteClick}
      ></i>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{director.nombre}</div>
        <p className="text-gray-700 text-base">
          Fecha de Nacimiento: {date.toDateString()}
        </p>
        <p className="mt-2 text-gray-700 text-base">{director.biografia}</p>
        <p className="mt-2 text-gray-700 text-base">{director.nacionalidad}</p>
      </div>
    </div>
  );
};

export default DirectorCard;
