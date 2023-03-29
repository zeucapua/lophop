<script lang="ts">
  export let data;

  const club = data.club;

  let show_add_member = false;
</script>

<main class="flex flex-col w-full h-full min-w-screen min-h-screen gap-8 p-8">
  <nav class="flex flex-row border-b-4 py-4 items-center justify-between">
    <a href="/dashboard" class="font-poppins">Back to Dashboard</a>
    <h1 class="text-3xl font-bold font-quicksand">Club { club.name }</h1>
    <a href={`/${club.slug}`} class="font-poppins">Home</a>
  </nav>
  <section class="flex flex-col gap-8">
    <div class="flex flex-row justify-between border-b-4 py-4 items-center">
      <h2 class="text-3xl font-bold font-quicksand">Members</h2>
      <button 
        class="text-xl font-poppins border-2 px-4 py-2 border-solid rounded-lg" 
        on:click={() => show_add_member = !show_add_member}>
        Create
      </button>
    </div>

    {#if show_add_member}
      <form method="POST" action="?/register">
        <input name="name" type="text" />
        <input name="password" type="password" />
        <input name="club_slug" type="hidden" value={club.slug} />
        <button>Register</button>
      </form>
    {/if}

    {#if club.members.length === 0}
      <p>There are no members in the club yet.</p>
    {:else}
      <ul class="grid grid-cols-5 grid-flow-row gap-4">
        {#each club.members as member}
          <li class="aspect-square flex flex-col gap-4 border-2 rounded-md p-4 w-full max-h-full">
            <img 
              src={`/abstract-characters/abstract-character-${member.avatar}.svg`}
              alt={`${member.name} avatar`}
            />
            <div class="flex flex-row justify-between gap-8">
              <p>{member.name}</p>
              <form method="POST" action="?/deleteMember">
                <input name="id" type="hidden" value={member.id} />
                <button>Delete</button>
              </form>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>


