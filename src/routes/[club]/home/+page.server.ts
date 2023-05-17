import { redirect } from "@sveltejs/kit";

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("access");
    cookies.delete("logged_in");

    throw redirect(303, "/");
  }
}
