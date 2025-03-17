import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET) || 'SECRET_KEY';

export async function getSession() {
  try {
    const token = (await cookies()).get("session-token")?.value;
    if (!token) return null;

    const verfied = await jwtVerify(token, JWT_SECRET);
    const payload = verfied.payload;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true },
    });
    
    if (!user) return null;

    return {
      user, expires: new Date(payload.exp as number * 1000),
    }
  }
  catch (error) {
    console.log(error);
    return null;
  }
}