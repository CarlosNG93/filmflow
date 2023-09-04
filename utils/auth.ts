import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function requireAdminRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const user = session?.user as any;
  const userRole = user?.role || "user";

  if (userRole !== "admin") {
    return res.status(403).json({ error: "No autorizado" });
  }
}
