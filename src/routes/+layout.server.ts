export async function load({ locals }) {
  let layout_data = {};


  if (locals.advisor) {
    layout_data = {...layout_data, logged_in: true };
  }

  console.log({ layout_data });
  return layout_data;
}
