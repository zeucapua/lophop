<script lang="ts">
  export let data;
  const club = data.club;
  const member = data.member;

  let show_menu = false; 

  $: console.log({ club, member });
</script>

<main class="flex flex-col w-full gap-8">
  <section class="flex flex-row justify-between items-center">
    <h1 class="text-3xl font-quicksand font-bold">Club {club?.name}</h1>
    <div class="flex flex-row items-center gap-4">
      {#if show_menu}
        <form method="POST" class="flex flex-row border-2 rounded-xl px-4 py-2">
          <button formaction="?/logout"> 
            Logout
          </button>
        </form>
      {/if}
      <button on:click={() => show_menu = !show_menu} class="border-2 rounded-xl px-4 py-2">
        {member?.name}
      </button>
    </div>
  </section>
</main>
