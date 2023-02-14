<script lang="ts">
  import Scratch from "../Scratch.svelte";
  import type { LayoutData } from "./$types";

  export let data : LayoutData;
  let club = data.club;

</script>

<main class="flex flex-col w-screen h-full min-h-screen p-16 gap-8">
  <p class="text-5xl capitalize">Welcome to Club {club.name}</p>

  <section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
    {#if club.projects}
      {#each club.projects as project}
        <div class="flex flex-col p-4 border-4 rounded-xl border-black">
          <Scratch link={project.link} />
          <div class="flex flex-row py-8 items-center justify-around">
            <p class="text-2xl font-bold">
              {project.title} 
              <span class="text-xl text-neutral-500">by {project.author}</span>
            </p>
            <a href={project.link} target="_blank" aria-label={project.title}>
              <p class="text-neutral-300">Open in Scratch</p>
            </a>
          </div>
        </div>
      {/each}
    {:else}
      <p>There are no projects made yet.</p>
    {/if}
  </section>
</main>
