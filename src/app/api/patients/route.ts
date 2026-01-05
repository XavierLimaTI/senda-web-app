import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const patientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  active: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const active = searchParams.get("active");

    const where = {
      deletedAt: null,
      ...(active !== null && { active: active === "true" }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { document: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.patient.count({ where }),
    ]);

    return NextResponse.json({
      data: patients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = patientSchema.parse(body);

    // Verificar documento duplicado
    if (validatedData.document) {
      const existingPatient = await prisma.patient.findFirst({
        where: {
          document: validatedData.document,
          deletedAt: null,
        },
      });

      if (existingPatient) {
        return NextResponse.json(
          { error: "Documento já cadastrado" },
          { status: 400 }
        );
      }
    }

    const patient = await prisma.patient.create({
      data: {
        ...validatedData,
        birthDate: validatedData.birthDate
          ? new Date(validatedData.birthDate)
          : null,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao criar paciente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do paciente é obrigatório" },
        { status: 400 }
      );
    }

    const validatedData = patientSchema.parse(data);

    // Verificar se paciente existe
    const existingPatient = await prisma.patient.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingPatient) {
      return NextResponse.json(
        { error: "Paciente não encontrado" },
        { status: 404 }
      );
    }

    // Verificar documento duplicado
    if (validatedData.document) {
      const duplicateDoc = await prisma.patient.findFirst({
        where: {
          document: validatedData.document,
          deletedAt: null,
          NOT: { id },
        },
      });

      if (duplicateDoc) {
        return NextResponse.json(
          { error: "Documento já cadastrado para outro paciente" },
          { status: 400 }
        );
      }
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        ...validatedData,
        birthDate: validatedData.birthDate
          ? new Date(validatedData.birthDate)
          : null,
      },
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao atualizar paciente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do paciente é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se paciente existe
    const existingPatient = await prisma.patient.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingPatient) {
      return NextResponse.json(
        { error: "Paciente não encontrado" },
        { status: 404 }
      );
    }

    // Soft delete
    await prisma.patient.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "Paciente excluído com sucesso",
    });
  } catch (error) {
    console.error("Erro ao excluir paciente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}