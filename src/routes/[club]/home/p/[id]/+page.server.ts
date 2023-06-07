import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const { id } = params;
  
  const response = await prisma.project.findUnique({
    where: { id },
    include: { submissions: { include: { member: true }}}
  });

  if (!response) {
    throw error(404, "Cannot find project");
  }

  const { submissions, ...project } = response;
  return { project, submissions };
}


export const actions = {
  submitProject: async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const link = data.get("link");
    const member_id = parseInt(data.get("member_id"));
    const project_id = params.id;

    const submission = await prisma.submission.create({
      data: {
        title,
        link,
        Project: { connect: { id: project_id }},
        member: { connect: { id: member_id }},
      }
    });

    if (!submission) { throw error(500, "Cannot submit right now"); }
  },
}