// pages/api/directores.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();

const directorSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio."),
  nacionalidad: yup.string().required("La nacionalidad es obligatoria."),
  fechaNacimiento: yup
    .date()
    .required("La fecha de nacimiento es obligatoria."),
  biografia: yup.string().required("La biografía es obligatoria."),
  imagen: yup
    .string()
    .required("La imagen es obligatoria."),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit = 10, skip = 0 } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const directores = await prisma.director.findMany({
          skip: Number(skip),
          take: Number(limit),
        });
        return res.status(200).json(directores);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        // Otros tipos de errores se manejan aquí, si es necesario
        return res
          .status(500)
          .json({ error: "Se ha producido un error inesperado." });
      }

    case "POST":
      try {
        console.log(req.body);
        const validatedData = await directorSchema.validate(req.body);
        const director = await prisma.director.create({
          data: validatedData,
        });
        return res.status(201).json(director);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        // Otros tipos de errores se manejan aquí, si es necesario
        return res
          .status(500)
          .json({ error: "Se ha producido un error inesperado." });
      }

    case "PUT":
      try {
        const { id, ...data } = req.body;
        await directorSchema.validate(data);
        const director = await prisma.director.update({
          where: { id: id },
          data: data,
        });
        return res.status(200).json(director);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        // Otros tipos de errores se manejan aquí, si es necesario
        return res
          .status(500)
          .json({ error: "Se ha producido un error inesperado." });
      }

    case "DELETE":
      try {
        const { id } = req.body;
        const director = await prisma.director.delete({
          where: { id: id },
        });
        return res.status(200).json(director);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        // Otros tipos de errores se manejan aquí, si es necesario
        return res
          .status(500)
          .json({ error: "Se ha producido un error inesperado." });
      }

    default:
      return res.status(405).end(); // Método no permitido
  }
};
