<script lang="ts">
  import { goto } from "$app/navigation";
  let club_slug : string;
</script>

<section class="flex flex-col gap-8 w-full h-full justify-center items-center">
  
  <div class="flex flex-col gap-16 items-center">
    <h1 class="text-8xl font-quicksand font-bold text-center">Find your Club</h1>
    
    <div class="text-3xl font-poppins px-auto flex flex-row gap-4 items-center">
      <p>lophop.club/</p>
      <input type="text" bind:value={club_slug} class="border-2 rounded-lg px-4 py-2"/>
      <button on:click={() => goto(`/${club_slug}`)} class="border-2 rounded-lg px-4 py-2">
        Hop In
      </button>
    </div>

  </div>

</section>
