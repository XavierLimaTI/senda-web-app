import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const professionalSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  licenseNumber: z.string().optional().nullable(),
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
          { specialty: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [professionals, total] = await Promise.all([
      prisma.professional.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.professional.count({ where }),
    ]);

    return NextResponse.json({
      data: professionals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = professionalSchema.parse(body);

    // Verificar email duplicado
    if (validatedData.email) {
      const existingProfessional = await prisma.professional.findFirst({
        where: {
          email: validatedData.email,
          deletedAt: null,
        },
      });

      if (existingProfessional) {
        return NextResponse.json(
          { error: "Email já cadastrado" },
          { status: 400 }
        );
      }
    }

    const professional = await prisma.professional.create({
      data: validatedData,
    });

    return NextResponse.json(professional, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao criar profissional:", error);
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
        { error: "ID do profissional é obrigatório" },
        { status: 400 }
      );
    }

    const validatedData = professionalSchema.parse(data);

    const existingProfessional = await prisma.professional.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingProfessional) {
      return NextResponse.json(
        { error: "Profissional não encontrado" },
        { status: 404 }
      );
    }

    const updatedProfessional = await prisma.professional.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedProfessional);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao atualizar profissional:", error);
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
        { error: "ID do profissional é obrigatório" },
        { status: 400 }
      );
    }

    const existingProfessional = await prisma.professional.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingProfessional) {
      return NextResponse.json(
        { error: "Profissional não encontrado" },
        { status: 404 }
      );
    }

    await prisma.professional.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "Profissional excluído com sucesso",
    });
  } catch (error) {
    console.error("Erro ao excluir profissional:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}