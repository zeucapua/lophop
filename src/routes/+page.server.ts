import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  redirectToClub: async ({ request }) => {
    const data = await request.formData();
    const slug = data.get("club_slug");

    const club = await prisma.club.findUnique({
      where: { slug }
    });

    if (!club) {
      return fail(400, { status: "missing" });
    }

    throw redirect(303, `/${slug}`);
  }
}
