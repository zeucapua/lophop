import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ params }) => {
  console.log("slug:", params.slug); 
  const club = await prisma.club.findUnique({
    where: {
      name: params.slug
    },
    include: { advisors: true, members: true },
  });
  await prisma.$disconnect();

  if (club) { 
    return { club: club }; 
  }
  throw error(404, "Not found");
}) satisfies LayoutServerLoad;
