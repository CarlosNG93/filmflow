import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as yup from 'yup';

const prisma = new PrismaClient();

const repartoSchema = yup.object().shape({
  id: yup.number().integer(),
  nombre: yup.string().required("El nombre es obligatorio."),
  fechaNacimiento: yup.date().required("La fecha de nacimiento es obligatoria."),
  nacionalidad: yup.string().required("La nacionalidad es obligatoria."),
  biografia: yup.string().required("La biografía es obligatoria."),
  imagen: yup.string().url("URL de imagen no válida").required("La imagen es obligatoria."),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const repartos = await prisma.reparto.findMany();
        res.status(200).json(repartos);
      } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al obtener los repartos" });
      }
      break;

    case "POST":
      try {
        const validatedData = await repartoSchema.validate(req.body);
        const reparto = await prisma.reparto.create({
          data: validatedData,
        });
        res.status(201).json(reparto);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Ocurrió un error al crear el reparto" });
      }
      break;

    case "PUT":
      try {
        const validatedData = await repartoSchema.validate(req.body);
        const { id } = validatedData;
        if (!id) throw new Error("Se necesita un ID para actualizar");

        const reparto = await prisma.reparto.update({
          where: { id },
          data: validatedData,
        });
        res.status(200).json(reparto);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Ocurrió un error al actualizar el reparto" });
      }
      break;

      case "DELETE":
        try {
          const { id } = req.body;
          const reparto = await prisma.reparto.delete({
            where: { id: id },
          });
          return res.status(200).json(reparto);
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
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
