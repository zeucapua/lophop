import { json } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import type { RequestHandler } from "./$types";

export async function POST({ request }) : RequestHandler {
  const { auth_id } = await request.json();
  const data = await prisma.advisor.findUnique({
    where: { auth_id: auth_id },
    include: { clubs: true },
  });
  console.log("POST", { data });

  return json({ data: data });
}

export async function PATCH({ request }) : RequestHandler {
  const { name, auth_id } = await request.json();
  const data = await prisma.advisor.upsert({
    where: { name: name },
    update: { name: name, auth_id: auth_id },
    create: { name: name, auth_id: auth_id }
  });
  console.log("PATCH", { data });
  return json({...data});
  
}
