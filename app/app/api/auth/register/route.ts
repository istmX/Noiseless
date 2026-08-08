import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const avatarSeed = Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${avatarSeed}`;

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatarUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
