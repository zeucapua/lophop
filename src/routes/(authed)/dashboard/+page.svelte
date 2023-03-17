<script lang="ts">
  import type { PageData } from "./$types";

  export let data : PageData;
  const advisor = data.advisor; 
  const clubs = data.clubs;

  $: console.log({ advisor });
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">
  <section class="flex flex-row justify-between border-b-4 py-4 items-center">
    <p class="text-3xl font-chillax font-semibold">Dashboard</p>
    <form method="POST" action="?/logout">
      <button class="text-2xl font-spacemono border-2 px-4 py-2 border-dotted hover:border-solid">Logout</button>
    </form>
  </section>

  <section class="flex flex-row gap-8">

    <section class="flex flex-col basis-1/2 gap-8">
      <div class="flex flex-row justify-between items-center border-b-4 py-4">
        <p class="text-3xl font-chillax font-semibold">Clubs</p>
        <a href="/create/?value=club">
          <button class="text-xl font-spacemono border-2 px-4 py-2 border-dotted hover:border-solid">
            + Create
          </button>
        </a>
      </div>
      {#each clubs as club}
        <div class="flex flex-row items-center justify-between border-2 rounded-md px-4 py-2">
          <p class="text-xl font-poppins">{club.name}</p>
          <form method="POST" action="?/deleteClub">
            <input name="club_slug" type="hidden" value={club.slug} />
            <button class="font-spacemono">Delete</button>
          </form>
        </div>
      {/each}
    </section>

  </section>
 
</main>
