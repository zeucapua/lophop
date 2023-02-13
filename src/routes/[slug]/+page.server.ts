import { get } from "svelte/store";
import { prisma } from "$lib/prisma";
import { club_id } from "$lib/stores";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

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
}) satisfies PageServerLoad;

export const actions = {
  submit: async ({request}) => {
    const data = await request.formData();
    const title = data.get("title");
    const author = data.get("author");
    const link = data.get("link");

    if (!title) { return fail(400, { title, author, link, missing: true }); }
    if (!author) { return fail(400, { title, author, link, missing: true }); }
    if (!link) { return fail(400, { title, author, link, missing: true }); }

    const project = await prisma.project.create({
      data: {
        title: title,
        author: author,
        link: link,
        clubId: get(club_id),
      },
    });

    if (project) { return { success: true }; }
    throw error(418, "I'm a teapot");

  }
}
