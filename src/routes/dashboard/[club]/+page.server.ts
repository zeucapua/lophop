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

  createMembers: async ({ params, request }) => {
    const data = await request.formData();
    const file = data.get("file");
    const club_slug = params.club;
    const file_text = await file.text();

    const names = file_text.split("\n").filter(name => name.trim() != "");
    const members = [];
    for (const n of names) {
       members.push({ name: n.replace(",", " ") });
    }

    await prisma.club.update({
      where: { slug: club_slug },
      data: {
        members: {
          createMany: {
            data: members,
          }
        }
      }
    });
  },

  updateMember: async ({ params, request }) => {
    const data = await request.formData();
    const member_id = parseInt(data.get("id"));
    const club_slug = params.club;

    const updated_name = data.get("name");
    const scratch_username = data.get("scratch_username");
    const scratch_password = data.get("scratch_password");

    await prisma.member.update({
      where: { id: member_id },
      data: {
        name: updated_name,
        scratch: {
          upsert: {
            create: {
              username: scratch_username,
              password: scratch_password,
            },
            update: {
              username: scratch_username,
              password: scratch_password,
            }
          } 
        }
      }
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
