// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { requireAdminRole } from "../../utils/auth";
import * as yup from "yup";

const userSchema = yup.object().shape({
  id: yup.number().integer(),
  name: yup.string().nullable(),
  email: yup
    .string()
    .email("Email no válido")
    .required("El email es obligatorio."),
  role: yup.string().oneOf(["user", "admin"], "Rol no válido").default("user"),
  emailVerified: yup.date().nullable(),
  image: yup.string().url("URL de imagen no válida").nullable(),
  
});

const prisma = new PrismaClient();

function transformDataForPrisma(data: any) {
  return {
    ...data,
    // Transforma aquí cualquier otro campo si es necesario.
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requireAdminRole(req, res);
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Ocurrió un error al obtener los usuarios" });
      }
      break;

    case "POST":
      try {
        const validatedData = await userSchema.validate(req.body);
        const transformedData = transformDataForPrisma(validatedData);
        const user = await prisma.user.create({
          data: transformedData,
        });
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al crear el usuario" });
      }
      break;

    case "PUT":
      try {
        const validatedData = await userSchema.validate(req.body);
        const { id } = validatedData;
        if (!id) throw new Error("Se necesita un ID para actualizar");

        const transformedData = transformDataForPrisma(validatedData);

        const user = await prisma.user.update({
          where: { id },
          data: transformedData,
        });
        res.status(200).json(user);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Ocurrió un error al actualizar el usuario" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        if (!id) throw new Error("Se necesita un ID para eliminar");

        await prisma.user.delete({
          where: { id },
        });
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Ocurrió un error al eliminar el usuario" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
