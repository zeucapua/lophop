export async function load({ cookies }) {
  let layout_data = {};

  const access_token = cookies.get("access_token");

  if (access_token) {
    layout_data = {...layout_data, logged_in: true };
  }

  return layout_data;
}
