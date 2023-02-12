import { json } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import type { RequestHandler } from "./$types";

export const GET = ( async () => {
  const clubs = await prisma.club.findMany();
  await prisma.$disconnect();
  return json({ clubs: clubs });
}) satisfies RequestHandler;
