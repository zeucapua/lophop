import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  createProject: async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    
    const project = await prisma.project.create({
      data: {
        title,
        content: "",
        club: { connect: { slug: params.club } },
      },
      include: { club: true }
    });

    if (!project) { throw fail(503, { message: "There was an error. Try again." }); }
  },
  deleteProject: async ({ request }) => {
    const data = await request.formData();
    const project_id = data.get("project_id");

    await prisma.submission.deleteMany({
      where: { projectId: project_id }
    });

    await prisma.project.delete({
      where: { id: project_id },
    });
  }
}
