

type Pelicula = {
  id: number;
  titulo: string;
  sinopsis: string;
  anioLanzamiento: number;
  duracion: number;
  imagenPortada: string;
  directorId: number;
};

type Reparto = {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  nacionalidad: string;
  imagen: string;
  biografia: string;
};

type Categoria = {
  id: number;
  nombre: string;
};

type Director = {
  id: number;
  nombre: string;
  nacionalidad: string;
  fechaNacimiento: Date;
  biografia: string;
  imagen: string;
};

export type DataState = {
  peliculas: Pelicula[];
  reparto: Reparto[];
  categorias: Categoria[];
  directores: Director[];
};

export type DataContextType = {
  data: DataState;
  fetchData: (endpoint: string, key: keyof DataState) => void;
  deleteData: (endpoint: string, id: number, key: keyof DataState) => void;
  updateData: (
    endpoint: string,
    updatedData: any,
    key: keyof DataState
  ) => void;
};
