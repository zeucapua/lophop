import { prisma } from "$lib/prisma";
import { redirect, fail } from "@sveltejs/kit";

export async function load({ locals }) {
  return { club: locals.club };
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
    const member_id = data.get("member_id");

    cookies.set("member_id", member_id, {
      path: "/",
      maxAge: 1800,
    });

    throw redirect(303, `/${params.club}/home`);
  }
}
