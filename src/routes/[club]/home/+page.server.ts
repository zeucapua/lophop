import { redirect } from "@sveltejs/kit";

export const actions = {
  logout: async ({ cookies, params }) => {
    const club_slug = params.club;
    cookies.delete(club_slug);
    cookies.delete("member_id");

    throw redirect(303, "/");
  }
}
