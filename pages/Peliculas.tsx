// Directores.tsx
import React, { useState } from 'react';
import { useData } from "../context/DataContext";
import FilmCard from '../components/CardFilm'; 
import PeliculasForm from '../components/PeliculasForm';

interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  anioLanzamiento: number;
  duracion: number;
  imagenPortada: string;
  directorId: number;
}

interface PeliculasProps {
  initialPeliculas: Pelicula[];
}

const Peliculas: React.FC<PeliculasProps> = ({ initialPeliculas }) => {
  const { data } = useData();
  const peliculas = data.peliculas.length ? data.peliculas : initialPeliculas;

  // Estado para controlar si el formulario está visible o no
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Ocultar formulario' : 'Agregar nueva pelicula'}
      </button>
      
      {/* Si showForm es true, se muestra el formulario */}
      {showForm && <PeliculasForm />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {peliculas.map((pelicula: Pelicula) => (
          <FilmCard key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/peliculas');
  const initialPeliculas= await res.json();
  console.log(initialPeliculas)

  return {
    props: {
      initialPeliculas
    }
  };
}

export default Peliculas;
