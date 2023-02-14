<script lang="ts">
  import Scratch from "../Scratch.svelte";
  import type { LayoutData } from "./$types";

  export let data : LayoutData;
  let club = data.club;

</script>

<p class="text-3xl capitalize">Welcome to Club {club.name}</p>

{#if club.projects}
  {#each club.projects as project}
    <p>{project.title} by {project.author}</p>
    <Scratch link={project.link} />
  {/each}
{:else}
  <p>There are no projects made yet.</p>
{/if}
