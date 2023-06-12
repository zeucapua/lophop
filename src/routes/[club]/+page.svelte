<script lang="ts">
  export let data;
  export let form;

  const members = data.club?.members;
  let member_id : number;
</script>

<svelte:head>
  <title>Entry - Club {data.club?.name}</title>
</svelte:head>

<section class="flex flex-col gap-8 w-full h-full justify-center">
  <h1 class="text-6xl font-poppins text-white text-center">What's the Secret?</h1>
  <form method="POST" class="flex flex-col gap-4 w-full items-center justify-center">
    {#if data.skip || form?.logged_in}
      {#if members}
        <div class="grid grid-cols-3 gap-4 w-full max-w-xl">
          {#each members as member}
            <div class="card card-compact border border-neutral  p-4">
              <figure>
                <img
                  src={`https://source.boringavatars.com/beam/64/${member.name}?colors=e779c1,58c7f3,22155,1a103c,f3cc30`}
                  alt={`${member.name} Avatar`}
                />
              </figure>
              <div class="card-body flex flex-row items-center justify-between">
                <input type="radio" class="radio-xs" bind:group={member_id} value={member.id} />
                <h2 class="card-title">{member.name}</h2>
              </div>
            </div>
          {/each}
          <li class="aspect-square flex flex-col border-2 rounded-md p-4 w-full h-full max-h-full">
            <p class="font-poppins text-center">Can't find your account? Talk to your advisor for help logging in.</p>
          </li>
        </div>
        <input name="member_id" type="hidden" value={member_id} />
        <button formaction="?/enter" class="btn btn-primary">Enter</button>
      {:else}
        <p>There are no members in this club! Talk to your advisor for help logging in.</p>
      {/if}
    {:else}
      {#if form?.incorrect}
        <p>Wrong secret. Try again!</p> 
      {/if}
      <div class="flex flex-row gap-4">
        <input name="secret" type="password" class="input input-bordered input-secondary"/>
        <button formaction="?/whisper" class="font-quicksand btn btn-primary">Enter</button>
      </div>
    {/if}
  </form>
</section>
