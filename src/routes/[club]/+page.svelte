<script lang="ts">
  export let data;
  export let form;

  const members = data.club?.members;
  let member_id : number;
</script>

<section class="flex flex-col gap-8 w-full h-full justify-center">
  <h1 class="text-6xl font-quicksand font-bold text-center">What's the Secret?</h1>
  <form method="POST" class="flex flex-col gap-4 w-full items-center justify-center">
    {#if data.skip || form?.logged_in}
      {#if members}
        <div class="grid grid-cols-3 gap-4 w-full max-w-xl">
          {#each members as member}
            <label>
              <li class="aspect-square flex flex-col gap-4 border-2 rounded-md p-4 w-full max-h-full">
                <img 
                  src={`/abstract-characters/abstract-character-${member.avatar}.svg`}
                  alt={`${member.name} avatar`}
                />
                <div class="flex flex-row justify-between gap-8">
                  <p>{member.name}</p>
                  <input type="radio" bind:group={member_id} value={member.id} />
                </div>
              </li>
            </label>
          {/each}
          <li class="aspect-square flex flex-col border-2 rounded-md p-4 w-full h-full max-h-full">
            <p class="font-poppins text-center">Can't find your account? Talk to your advisor for help logging in.</p>
          </li>
        </div>
        <input name="member_id" type="hidden" value={member_id} />
        <button formaction="?/enter" class="font-poppins border-2 rounded-lg px-4 py-2">Enter</button>
      {:else}
        <p>There are no members in this club! Talk to your advisor for help logging in.</p>
      {/if}
    {:else}
      {#if form?.incorrect}
        <p>Wrong secret. Try again!</p> 
      {/if}
      <div class="flex flex-row gap-4">
        <input name="secret" type="password" class="border-2 rounded-lg px-4 py-2"/>
        <button formaction="?/whisper" class="font-poppins border-2 rounded-lg px-4 py-2">Whisper</button>
      </div>
    {/if}
  </form>
</section>
