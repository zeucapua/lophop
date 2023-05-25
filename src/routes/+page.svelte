<script lang="ts">
  let club_slug : string;
</script>

<h2 class="text-8xl font-poppins font-bold text-primary text-center">
  Hop in to Coding Fun!
</h2>

<div class="justify-center input-group input-group-lg">
  <span>lophop.club/</span>
  <input bind:value={club_slug} type="text" placeholder="awesome-club" class="input input-bordered" />
  <a href={`/${club_slug}`} class="btn btn-square btn-accent">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  </a>  
</div>
