<script lang="ts">
  export let data;
  const { club, member } = data;
  const projects = club.projects;

  console.log({ club });
</script>

<main class="flex flex-col w-full gap-8">
  <section class="flex flex-row justify-between items-center">
    <h1 class="text-3xl font-quicksand font-bold">Club {club?.name}</h1>
    <div class="flex flex-row items-center gap-4">
      <div class="flex-none px-4">
        <div class="dropdown dropdown-end">
          <label tabindex="-1" class="btn btn-ghost btn-circle avatar">
            <img 
              src={`/abstract-characters/abstract-character-${member?.avatar}.svg`} 
              alt={``} class="w-12 rounded-full" 
            />
          </label>
          <ul tabindex="-1" class="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box border-2 border-base-200 w-fit">
            <li class="text-error">
              <form method="POST" action="?/logout">
                <button>Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="flex flex-col">
    <div class="flex flex-row">
      <h1 class="text-3xl font-poppins font-bold text-primary">Projects</h1> 
    </div>
    <div class="divider" />
    {#if projects.length > 0}
      {#each projects as project}
        <div class="card p-8 w-fit shadow-xl">
          <h3 class="font-poppins card-title">{project.title}</h3>
          <p class="font-quicksand text-ellipsis">{project.content}</p>
          <div class="card-actions justify-end">
            <a href={`/${club.slug}/home/p/${project.id}`}>
              <button class="btn btn-secondary">More</button>
            </a>
          </div>
        </div>
      {/each}
    {:else}
      <p>There are no projects yet. Wait for your advisor to make one!</p>
    {/if}
  </section>
</main>
