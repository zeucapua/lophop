<script lang="ts">
  let club_slug : string;
</script>

<div class="flex flex-col gap-8 p-8 justify-center">
  <h2 class="text-8xl font-poppins font-bold text-primary text-center">
    Hop in to Coding Fun!
  </h2>

  <div class="join my-8 w-fit rounded-xl border border-neutral self-center">
    <span class="join-item text-2xl self-center p-4">lophop.club/</span>
    <input bind:value={club_slug} type="text" placeholder="awesome-club" class="join-item p-4 w-full h-full  text-2xl input input-bordered" />
    <a href={`/${club_slug}`} class="join-item self-center rounded-r-lg btn btn-square p-2 h-full btn-accent">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </a>  
  </div>
</div>
