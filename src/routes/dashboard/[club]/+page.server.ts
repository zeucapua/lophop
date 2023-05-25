import { prisma } from "$lib/prisma";

export const actions = {
  createMember: async ({ params, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const club_slug = params.club;

    const avatar = Math.floor(Math.random() * 50) + 1;

    await prisma.member.create({
      data: { 
        name,
        avatar,
        club: {
          connect: { slug: club_slug }
        }
      },
    });
  },

  deleteMember: async ({ params, request }) => {
    const data = await request.formData();
    const member_id = parseInt(data.get("id"));
    const club_slug = params.club;

    await prisma.club.update({
      where: { slug: club_slug },
      data: {
        members: {
          update: {
            where: { id: member_id },
            data: { submissions: { deleteMany: {} }}
          }
        }
      }
    });

    await prisma.club.update({
      where: { slug: club_slug },
      data: {
        members: {
          delete: { id: member_id }
        }
      }
    });
  },

  // TODO: implement fix to DateTime[]
  toggleAttendance: async ({ params, request }) => {
    const data = await request.formData();
    const check = data.get("check");
    const member_id = parseInt(data.get("id"));
    const club_slug = params.club;
    
    console.log({ check });
    
    if (check) {
      const member = await prisma.member.update({
        where: { 
          id: member_id,
        },
        data: {
          attendance: {
            push: new Date().toISOString()
          }
        }
      });
      console.log({ member }); 
    }
    else {
      console.log("uncheck");
    }
  },

  createProject: async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const club_slug = params.club;

    await prisma.project.create({
      data: {
        title,
        club: {
          connect: { slug: club_slug }
        }
      }
    });
  }
}
