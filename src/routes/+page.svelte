<script lang="ts">
  export let form;
</script>

<div class="flex flex-col gap-8 p-8 justify-center">
  <h2 class="text-8xl font-poppins font-bold text-primary text-center">
    Hop in to Coding Fun!
  </h2>

  {#if form?.status === "missing"}
    <div class="alert alert-error w-fit self-center text-center font-bold">
      <p>Error: Cannot find club! Make sure the name is spelled correctly</p>
    </div>
  {/if}

  <form method="POST" action="?/redirectToClub" class="join items-center self-center font-quicksand">
    <p class="join-item text-2xl p-4 border">lophop.club</p>
    <input 
      class="join-item input input-bordered h-full p-4 font-bold text-2xl"
      name="club_slug" type="text" placeholder="awesome-wizards" />
    <button class="join-item btn btn-accent h-full p-4">
      <svg viewbox="0 0 32 32" width="32" height="32" stroke="currentColor" fill="currentColor"><path d="M31.7 30.3L22 20.5c1.8-2.2 2.9-5 2.9-8 0-6.9-5.6-12.5-12.5-12.5s-12.5 5.6-12.5 12.5 5.6 12.5 12.5 12.5c3.1 0 6-1.2 8.2-3.1l9.7 9.8c0.4 0.4 1 0.4 1.4 0 0.4-0.4 0.4-1 0-1.4zM12.4 23c-5.8 0-10.5-4.7-10.5-10.5S6.6 2 12.4 2c5.8 0 10.5 4.7 10.5 10.5S18.2 23 12.4 23z"  /></svg>
    </button>
  </form>


</div>
