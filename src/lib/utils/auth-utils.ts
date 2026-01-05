import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export type UserRole = "admin" | "manager" | "user";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    return { authorized: false, error: "Não autorizado", status: 401 };
  }
  return { authorized: true, session, user: session.user };
}

export async function checkRole(allowedRoles: UserRole[]) {
  const authResult = await checkAuth();
  if (!authResult.authorized) {
    return authResult;
  }

  const userRole = (authResult.user as { role?: string })?.role as UserRole;
  if (!allowedRoles.includes(userRole)) {
    return { authorized: false, error: "Acesso negado", status: 403 };
  }

  return authResult;
}

export function unauthorizedResponse(message = "Não autorizado") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenResponse(message = "Acesso negado") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function errorResponse(message = "Erro interno do servidor", status = 500) {
  return NextResponse.json({ error: message }, { status });
}