import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as yup from 'yup';

const prisma = new PrismaClient();

const categoriaSchema = yup.object().shape({
  id: yup.number().integer(),
  nombre: yup.string().required("El nombre es obligatorio.").max(100, "El nombre no debe exceder los 100 caracteres"),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const categorias = await prisma.categoria.findMany({
          include: {
            peliculas: true,
          },
        });
        res.status(200).json(categorias);
      } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al obtener las categorías" });
      }
      break;

    case "POST":
      try {
        const validatedData = await categoriaSchema.validate(req.body);
        const categoria = await prisma.categoria.create({
          data: validatedData,
        });
        res.status(201).json(categoria);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Ocurrió un error al crear la categoría" });
      }
      break;

    case "PUT":
      try {
        const validatedData = await categoriaSchema.validate(req.body);
        const { id } = validatedData;
        if (!id) throw new Error("Se necesita un ID para actualizar");

        const categoria = await prisma.categoria.update({
          where: { id },
          data: validatedData,
        });
        res.status(200).json(categoria);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Ocurrió un error al actualizar la categoría" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        if (!id) throw new Error("Se necesita un ID para eliminar");

        await prisma.categoria.delete({
          where: { id },
        });
        res.status(200).json({ message: "Categoría eliminada correctamente" });
      } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al eliminar la categoría" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
