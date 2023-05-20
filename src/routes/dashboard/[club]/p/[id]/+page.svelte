<script lang="ts">
  import { enhance } from '$app/forms';

  export let data;
  const club = data.club;
  let project = data.project;

</script>

<a href={`/dashboard/${club}`} class="">Dashboard</a>

<form method="POST" action="?/saveProject" use:enhance>
  <label class="label">
    <span class="label-text text-lg text-base-content/80">Title</span>
  </label>
  <input name="title" type="text" value={project.title} class="text-2xl input input-primary input-lg input-bordered" />
  <label class="label">
    <span class="label-text text-lg text-base-content/80">Content</span>
  </label>
  <textarea name="content" value={project.content ?? ""} class="text-2xl input input-secondary input-lg input-bordered w-full " />
</form>
