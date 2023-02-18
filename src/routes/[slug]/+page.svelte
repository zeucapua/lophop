<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data : LayoutData;
  let club = data.club;

</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen bg-base p-16 gap-8">

  <p class="text-6xl font-bold text-content capitalize">
    Welcome to Club <span class="text-7xl text-accent">{club.name}</span>
  </p>

</main>
