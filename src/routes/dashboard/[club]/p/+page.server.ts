import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ url, params }) {
  const { club } = params;
  const project_id = url.searchParams.get("id");

  const response = await prisma.project.findUnique({
    where: { id: project_id },
    include: { submissions: { include: { member: true }}}
  });

  if (!response) { throw error(404, "Project not found"); }

  const { submissions, ...project } = response;

  return { club, project, submissions };
}

export const actions = {
  saveProject: async ({ url, request }) => {
    const project_id = url.searchParams.get("id");
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        content
      }
    });

    if (!project) { throw error(500, "Project can't be updated. Try again."); }
    return { title, content }
  },

  deleteProject: async ({ request }) => {

  },

  deleteSubmission: async ({ request }) => {
    const data = await request.formData();
    const submission_id = data.get("submission_id");

    await prisma.submission.delete({
      where: { id: submission_id }
    });
  },
}
