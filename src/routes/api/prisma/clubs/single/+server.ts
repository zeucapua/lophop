import { json } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import type { RequestHandler } from "./$types";

export const POST = ( async ({request}) => {
  const { name } = await request.json();
  const club = await prisma.club.create({
    data : {
      name: name,
    },
  });
  await prisma.$disconnect();
  return json({ club: club });
}) satisfies RequestHandler;

export const GET = ( async ({request}) => {
  const { id } = await request.json();
  const club = await prisma.club.findUnique({
    where: {
      id: id
    }
  });
  await prisma.$disconnect();
  return json({ club: club });
}) satisfies RequestHandler;

export const DELETE = ( async ({request}) => {
  const { id } = await request.json();
  const deleteClub = await prisma.club.delete({
    where: {
      id: id
    }
  });
  await prisma.$disconnect();
  return json({ status: deleteClub });
}) satisfies RequestHandler;
