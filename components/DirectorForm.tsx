import React from 'react';
import * as yup from 'yup';
import { Director } from '@prisma/client';
import useForm from '../hooks/useForm';
import { yupResolver } from '@hookform/resolvers/yup';

const directorSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    nacionalidad: yup.string().required('La nacionalidad es requerida'),
    fechaNacimiento: yup.date().required('La fecha de nacimiento es requerida'),
    biografia: yup.string().required('La biografía es requerida'),
    imagen: yup.string().url('Debe ser una URL válida').required('La imagen es requerida'),
});

type DirectorFormProps = {
    onSave: (director: Director) => void; 
}


const DirectorForm = () => {
    const initialState = {
        nombre: '',
        nacionalidad: '',
        fechaNacimiento: '',
        biografia: '',
        imagen: ''
    };

    const { form, handleChange, reset } = useForm(initialState);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        console.log("Enviando datos:", form);
        const response = await fetch('http://localhost:3000/api/directores', {
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
      console.log(form);
  
      // Si quieres resetear el formulario después de enviarlo:
      reset();
    }

    
    
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Nacionalidad:</label>
          <input 
            type="text"
            name="nacionalidad"
            value={form.nacionalidad}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <label>Fecha de Nacimiento:</label>
          <input 
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <label>Biografía:</label>
          <textarea 
            name="biografia"
            value={form.biografia}
            onChange={handleChange}
          />
        </div>
  
        <div>
          <label>Imagen:</label>
          <input 
            type="text"
            name="imagen"
            value={form.imagen}
            onChange={handleChange} // Nota: la manipulación de archivos puede requerir una lógica adicional.
          />
        </div>
  
        <button type="submit">Enviar</button>
      </form>
    );
  }
  
  export default DirectorForm;