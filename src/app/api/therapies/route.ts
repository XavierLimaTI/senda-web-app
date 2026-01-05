import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const therapySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  active: z.boolean().optional().default(true), // ✅ Adicionar campo active
});

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Therapy ID is required" },
        { status: 400 }
      );
    }

    const validatedData = therapySchema.parse(data);

    const updatedTherapy = await prisma.therapy.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedTherapy); // ✅ Retorna a terapia atualizada
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 422 }
      ); // Unprocessable Entity
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Therapy ID is required" },
        { status: 400 }
      );
    }

    await prisma.therapy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: "Therapy deleted" }); // ✅ Confirmação clara
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}