// DirectorCard.tsx
import React from 'react';

import { useData } from '../context/DataContext';


type Pelicula = {
    id: number;
    titulo: string;
    sinopsis: string;
    anioLanzamiento: number;
    duracion: number;
    imagenPortada: string;
    directorId: number;
  };

type Director = {
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    nacionalidad: string;
    imagen: string;
    biografia: string;
}

type FilmCardProps = {
    pelicula: Pelicula;
    
};


const FilmCard: React.FC<FilmCardProps> = ({ pelicula }) => {
    const [directores, setDirectores] = React.useState<Record<number, Director>>({});
    const { deleteData } = useData();
    const date = new Date(pelicula.anioLanzamiento);

    const handleDeleteClick = async () => {
        const confirmation = window.confirm('¿Estás seguro de que quieres borrar este director?');
        if (confirmation) {
            try {
                await deleteData('peliculas', pelicula.id, 'peliculas');
                console.log('Pelicula eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar la pelicula:', error);
            }
        }
    };

    React.useEffect(() => {
        const fetchDirectores = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/directores');
                const data: Director[] = await response.json();
                const directorMap = data.reduce<Record<number, Director>>((acc, director) => {
                    acc[director.id] = director;
                    return acc;
                }, {});
                
                setDirectores(directorMap);
            } catch (error) {
                console.error('Error al obtener los directores:', error);
            }
        };
    
        fetchDirectores();
    }, []);

    const nombreDirector = directores[pelicula.directorId]?.nombre || 'Desconocido';

    return (
        <div className="relative max-w-sm rounded overflow-hidden shadow-lg mt-7">
            <div className="w-full h-64">
                <img 
                    className="w-full h-full object-cover object-center" 
                    src={pelicula.imagenPortada} 
                    alt={pelicula.titulo} 
                />
            </div>
            <i className="fa fa-trash absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer" onClick={handleDeleteClick}></i>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{pelicula.titulo}</div>
                <p className="text-gray-700 text-base">
                    Fecha de Nacimiento: {date.toDateString()}
                </p>
                <p className="mt-2 text-gray-700 text-base">
                    {pelicula.sinopsis}
                </p>
                <p className="mt-2 text-gray-700 text-base">
                    {pelicula.duracion}
                </p>
                <p className="mt-2 text-gray-700 text-base">
                    Director: {nombreDirector}
                </p>
            </div>
        </div>
    );
};

export default FilmCard;
