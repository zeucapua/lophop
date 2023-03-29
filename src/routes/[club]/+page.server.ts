import { prisma } from "$lib/prisma";
import { redirect, error, fail } from "@sveltejs/kit";

export async function load({ cookies, params }) {
  const club_slug = params.club;

  if (cookies.get(club_slug)) { throw redirect(307, `/${club_slug}/home`); }
  
  const club = await prisma.club.findUnique({
    where: { slug: club_slug },
    select: {
      name: true,
    }
  });

  if (!club) { throw error(404, { message: "Club Not Found" }); }
  return { club }
}


export const actions = {
  whisper: async ({ cookies, request, params }) => {
    const club_slug = params.club;
    const club = await prisma.club.findUnique({
      where: { slug: club_slug },
      select: { secret: true }
    });

    const data = await request.formData();
    const secret_input = data.get("secret");

    if (club?.secret != secret_input) {
      return fail(400, { incorrect: true });
    }

    cookies.set(club_slug, true, {
      path: "/",
      maxAge: 1800,
    });

    throw redirect(308, `/${club_slug}/home`);
  },
  enter: async ({ request }) 
}
