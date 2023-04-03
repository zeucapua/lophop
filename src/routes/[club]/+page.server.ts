import { prisma } from "$lib/prisma";
import { redirect, error, fail } from "@sveltejs/kit";

export async function load({ cookies, params }) {
  const club_slug = params.club;

  
  const club = await prisma.club.findUnique({
    where: { slug: club_slug },
    select: {
      name: true,
      members: true,
    }
  });

  if (cookies.get(club_slug)) {
    return { club, skip: true }  
  }

  if (!club) { throw error(404, { message: "Club Not Found" }); }
  return { club }
}


export const actions = {
  whisper: async ({ cookies, request, params }) => {
    const club_slug = params.club;
    const club = await prisma.club.findUnique({
      where: { slug: club_slug },
      select: { secret: true, members: true }
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

    return { logged_in: true };
  },
  enter: async ({ cookies, params, request }) => {
    const data = await request.formData();
    const member_id = parseInt(data.get("member_id"));

    const member = await prisma.member.findUnique({
      where: { id: member_id }
    });

    cookies.set("logged_in", member?.id, {
      path: "/",
      maxAge: 1800,
    });

    throw redirect(303, `/${params.club}/home`);
  }
}
