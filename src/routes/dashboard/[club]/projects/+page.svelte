<script lang="ts">
  export let data : PageData;
  const club = data.club;
  let projects = club.projects;

  $: console.log({ club, projects });  
</script>


{#if projects.length === 0}
  <p>There are no projects yet.</p>
{:else}
  {#each projects as project}
    <div class="flex flex-row gap-8">
      <a href={`/dashboard/${club.slug}/projects/${project.id}`}>{project.title}</a>
      <form method="POST" action="?/deleteProject">
        <input name="project_id" type="hidden" value={project.id} />
        <button>Delete</button>
      </form>
    </div>
  {/each}
{/if}

<form method="POST" action="?/createProject">
  <input name="club_id" type="hidden" value={club.id} />
  <input name="title" type="text" placeholder="Title" />
  <button>Create</button>
</form>


