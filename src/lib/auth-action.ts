"use server"

import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET) || 'SECRET_KEY';

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user || !(await compare(password, user.password))) {
      return { success: false, error: "Invalid email or password" };
    }

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    (await cookies()).set({
      name: "session-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, error: "Error logging in" };
  }
}


export async function logout() {
  (await cookies()).delete("session-token")
  return { success: true }
}

export async function register(email: string, password: string, name: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "User already exists" }
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    return login(email, password)
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Failed to register" }
  }
}