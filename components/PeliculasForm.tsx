import React from 'react';
import * as yup from 'yup';
import useForm from '../hooks/useForm';

const peliculaSchema = yup.object().shape({
    titulo: yup.string().required('El título es requerido'),
    sinopsis: yup.string().required('La sinopsis es requerida'),
    anioLanzamiento: yup.number().required('El año de lanzamiento es requerido'),
    duracion: yup.number().required('La duración es requerida'),
    imagenPortada: yup.string().url('Debe ser una URL válida').required('La imagen es requerida'),
    directorId: yup.number().required('El ID del director es requerido'),
});

const PeliculaForm = () => {
    const initialState = {
        titulo: '',
        sinopsis: '',
        anioLanzamiento: '',
        duracion: '',
        imagenPortada: '',
        directorId: ''
    };

    const { form, handleChange, reset } = useForm(initialState);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/api/peliculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al enviar el formulario.');
        }

        console.log('Datos enviados con éxito:', data);
        reset();

      } catch (error) {
        console.error('Error:', error);
      }
  
      // Si quieres resetear el formulario después de enviarlo:
      reset();
    }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input 
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Sinopsis:</label>
          <textarea 
            name="sinopsis"
            value={form.sinopsis}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <label>Año de Lanzamiento:</label>
          <input 
            type="number"
            name="anioLanzamiento"
            value={form.anioLanzamiento}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Duración:</label>
          <input 
            type="number"
            name="duracion"
            value={form.duracion}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <label>Imagen de Portada:</label>
          <input 
            type="text"
            name="imagenPortada"
            value={form.imagenPortada}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>ID del Director:</label>
          <input 
            type="number"
            name="directorId"
            value={form.directorId}
            onChange={handleChange}
          />
        </div>
  
        <button type="submit">Enviar</button>
      </form>
    );
}

export default PeliculaForm;
