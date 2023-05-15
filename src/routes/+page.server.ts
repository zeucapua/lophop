import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  findClub: async ({ request }) => {
    const data = await request.formData();
    const slug = data.get("club_slug");

    const club = await prisma.club.findUnique({
      where: { slug }
    });

    if (!club) { 
      return fail(404, { message: `Club "${slug}" not found!` });
    }

    throw redirect(308, `/${slug}`);
  },
}
