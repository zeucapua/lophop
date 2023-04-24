import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const club_slug = params.club;

  const club = await prisma.club.findUnique({
    where: { slug: club_slug },
    select: {
      name: true,
      members: true,
      advisors: true,
      slug: true,
      projects: true,
    }
  });

  if (!club) { throw error(404, "Club not found"); }

  return { club };
}
