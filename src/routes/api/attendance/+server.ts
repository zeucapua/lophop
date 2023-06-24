import { json } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";

export async function POST({ request }) {
    const { checked, member_id } = await request.json();
    
    console.log({ checked });
    
    if (checked) {
      const member = await prisma.member.update({
        where: { 
          id: member_id,
        },
        data: {
          attendance: {
            push: new Date().toDateString()
          }
        }
      });
      console.log({ member }); 
      return json(member);
    }
    else {
      const member = await prisma.member.findUnique({
        where: { id: member_id },
      });

      const updatedAttendance = member.attendance.filter(
        date => date != new Date().toDateString()
      );

      console.log({ updatedAttendance });

      const updatedMember = await prisma.member.update({
        where: { id: member_id },
        data: {
          attendance: {
            set: updatedAttendance
          }
        }
      });

      console.log({ member_id }, updatedMember.attendance);
      return json(updatedMember);
    }
}
