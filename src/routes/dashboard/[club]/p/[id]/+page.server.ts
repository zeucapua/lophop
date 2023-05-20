import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const { id, club } = params;
  const project = await prisma.project.findUnique({
    where: { id },
  });


  if (!project) { throw error(404, "Project not found"); }

  return { project, club };
}
