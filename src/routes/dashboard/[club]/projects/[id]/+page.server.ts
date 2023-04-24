import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const { club, id } = params;

  const project_data = await prisma.project.findUnique({
    where: { id },
    include: { submissions: true }
  });

  if (!project_data) { 
    throw redirect(308, `/dashboard/${club}/projects`);
  }

  const { submissions, ...project } = project_data;

  return { project, submissions };
}

export const actions = {
  updateProject: async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");

    const project_data = await prisma.project.update({
      where: { id: params.id },
      data: { title, content },
      include: { submissions: true }
    });

    if (!project_data) { throw fail(503, { message: "An error occused while saving." }) };

    return { success: true }
  },
}
