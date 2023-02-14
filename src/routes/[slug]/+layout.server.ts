import { prisma } from "$lib/prisma";
import { club_id } from "$lib/stores";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ params }) => {
  console.log("slug:", params.slug); 
  const club = await prisma.club.findFirst({
    where: {
      name: params.slug
    },
    include: { projects: true },
  });
  await prisma.$disconnect();

  if (club) { 
    club_id.set(club.id);
    return { club: club }; 
  }
  throw error(404, "Not found");
}) satisfies LayoutServerLoad;
