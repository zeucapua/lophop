<script lang="ts">
  import Scratch from "../Scratch.svelte";
  import type { LayoutData } from "./$types";

  export let data : LayoutData;
  let club = data.club;

</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen bg-base p-16 gap-8">

  <p class="text-6xl font-bold text-content capitalize">
    Welcome to Club <span class="text-7xl text-accent">{club.name}</span>
  </p>

  <nav class="flex flex-row gap-8 ">
    <button 
      class="text-3xl font-bold text-content underline underline-offset-8 decoration-4"
    >
      Showcase
    </button>
    <button class="text-3xl text-content">
      Guides
    </button>
  </nav>

  <section 
    class=
    {"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto"}
  >
    {#if club.projects}
      {#each club.projects as project}
        <div class="flex flex-col gap-8 p-8 border-dashed border-2 border-primary">
          <Scratch link={project.link} />
          <div class="flex flex-row justify-between px-8">
            <p class="text-3xl text-content font-bold">
              {project.title} 
              <span class="text-2xl text-secondary">by {project.author}</span>
            </p>
            <a href={project.link}>
              <button 
                class=
                {"text-xl px-4 py-2 rounded-xl border-2 border-accent text-accent"}
              >
                Show Code
              </button>
            </a>
          </div>
        </div>
      {/each}
    {:else}
      <p>There are no projects made yet.</p>
    {/if}
  </section>
</main>
