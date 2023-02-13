import { json } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
  const { project } = await request.json();
  const response = await prisma.project.create({
    data: {...project},
  });
  await prisma.$disconnect();  
  const data = response.json();
  return json({ data: data });
}) satisfies RequestHandler;

