import { redirect } from "@sveltejs/kit";

export const actions = {
  logout: async ({ cookies }) => {
    await cookies.delete("access", { path: "/" });
    await cookies.delete("logged_in", { path: "/" });

    throw redirect(303, "/");
  }
}
