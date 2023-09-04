import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();

const peliculaSchema = yup.object().shape({
  id: yup.number().integer(),
  titulo: yup.string().required("El título es obligatorio."),
  sinopsis: yup.string().nullable().default(""),
  anioLanzamiento: yup.number().required().positive().integer(),
  duracion: yup.number().required().positive().integer(),
  imagenPortada: yup.string().required(),
  directorId: yup.number().required().positive().integer(),
  // Agrega aquí cualquier otro campo que requieras validar, ajustando según necesites.
});

const transformDataForPrisma = (data: any) => {
  if (data.sinopsis === undefined) {
    data.sinopsis = ""; // Convierte sinopsis en un string vacío si es undefined
  }
  if (data.id === undefined) {
    delete data.id; // Elimina el id si es undefined en el caso de creación
  }
  return data;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const peliculas = await prisma.pelicula.findMany();
        res.status(200).json(peliculas);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Ocurrió un error al obtener las películas" });
      }
      break;

    case "POST":
      try {
        const validatedData = await peliculaSchema.validate(req.body);
        const transformedData = transformDataForPrisma(validatedData);
        const pelicula = await prisma.pelicula.create({
          data: transformedData,
        });
        res.status(201).json(pelicula);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        res
          .status(500)
          .json({ error: "Ocurrió un error al crear la película" });
      }
      break;

    case "PUT":
      try {
        const validatedData = await peliculaSchema.validate(req.body);
        const transformedData = transformDataForPrisma(validatedData);
        const { id } = transformedData;
        if (!id) throw new Error("Se necesita un ID para actualizar");

        const pelicula = await prisma.pelicula.update({
          where: { id },
          data: transformedData,
        });
        res.status(200).json(pelicula);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        res
          .status(500)
          .json({ error: "Ocurrió un error al actualizar la película" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        if (!id) throw new Error("Se necesita un ID para eliminar");

        await prisma.pelicula.delete({
          where: { id },
        });
        res.status(200).json({ message: "Pelicula eliminada correctamente" });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Ocurrió un error al eliminar la película" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
