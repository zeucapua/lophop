<script lang="ts">
  export let data;
  const { club, member } = data;
  const projects = club.projects;
</script>

<svelte:head>
  <title>Club {club.name} - Lophop</title>
</svelte:head>

<section class="flex flex-col">
  <div class="flex flex-row">
    <h1 class="text-3xl font-poppins font-bold text-primary">Projects</h1> 
  </div>
  <div class="divider" />
  {#if projects.length > 0}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {#each projects as project}
        <div class="card p-8 bg-neutral w-fit shadow-xl">
          <h3 class="font-poppins card-title">{project.title}</h3>
          <p class="font-quicksand text-ellipsis">{project.content}</p>
          <div class="card-actions justify-end">
            <a href={`/${club.slug}/home/p/${project.id}`}>
              <button class="btn btn-secondary">More</button>
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>There are no projects yet. Wait for your advisor to make one!</p>
  {/if}
</section>

