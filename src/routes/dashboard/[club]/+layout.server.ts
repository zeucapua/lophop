import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ locals, params }) {
  const user = await locals.getSession().then((s) => s.user);
  const club_slug = params.club;

  const club = await prisma.club.findUnique({
    where: { slug: club_slug },
    select: {
      name: true,
      members: true,
      users: true,
      slug: true,
      projects: true,
    }
  });

  if (!club) { throw error(404, "Club not found"); }
  if (!club.users.find(u => u.id === user.id)) { throw error(403, "Access denied."); }

  return { club };
}
