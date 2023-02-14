import { get } from "svelte/store";
import { prisma } from "$lib/prisma";
import { club_id } from "$lib/stores";
import { fail, error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";


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
        Club: {
          connect: {
            id: get(club_id)
          } 
        }
      },
    });

    if (project) {
      const club = await prisma.club.findUnique({
        where: { id: get(club_id) }
      });
      console.log("club name", club.name);
      throw redirect(303, `/${club.name}`);
    }
    throw error(418, "I'm a teapot");

  }
} satisfies Actions;
