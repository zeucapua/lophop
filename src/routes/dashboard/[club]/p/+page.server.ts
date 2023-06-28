import { prisma } from "$lib/prisma";
import { error, redirect } from "@sveltejs/kit";

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
  saveProject: async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");
    const project_id = data.get("project_id");

    const project = await prisma.project.update({
      where: { id: project_id },
      data: {
        title,
        content
      }
    });

    if (!project) { throw error(500, "Project can't be updated. Try again."); }
    throw redirect(303, `/dashboard/${params.club}/p?id=${project_id}`);
  },

  deleteProject: async ({ request }) => {

  },

  deleteSubmission: async ({ params, request }) => {
    const data = await request.formData();
    const submission_id = data.get("submission_id");

    await prisma.submission.delete({
      where: { id: submission_id }
    });
    
    throw redirect(303, `/dashboard/${params.club}/p?id=${project_id}`);
  },
}
