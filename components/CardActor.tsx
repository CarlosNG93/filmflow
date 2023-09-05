// DirectorCard.tsx
import React from "react";

import { useData } from "../context/DataContext";

type Reparto = {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  nacionalidad: string;
  imagen: string;
  biografia: string;
};

type RepartoCardProps = {
  reparto: Reparto;
};

const RepartoCard: React.FC<RepartoCardProps> = ({ reparto }) => {
  const { data, deleteData, updateData } = useData();
  
  const date = new Date(reparto.fechaNacimiento);

  const handleDeleteClick = async () => {
    const confirmation = window.confirm(
      "¿Estás seguro de que quieres borrar este director?"
    );
    if (confirmation) {
      try {
        
        await deleteData("reparto", reparto.id, "reparto");
        console.log("Actor eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el actor:", error);
      }
    }
  };
  

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg mt-7">
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover object-center"
          src={reparto.imagen}
          alt={reparto.nombre}
        />
      </div>
      <i
        className="fa fa-trash absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
        onClick={handleDeleteClick}
      ></i>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{reparto.nombre}</div>
        <p className="text-gray-700 text-base">
          Fecha de Nacimiento: {date.toDateString()}
        </p>
        <p className="mt-2 text-gray-700 text-base">{reparto.biografia}</p>
        <p className="mt-2 text-gray-700 text-base">{reparto.nacionalidad}</p>
      </div>
    </div>
  );
};

export default RepartoCard;
