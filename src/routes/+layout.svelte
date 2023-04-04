<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  export let data;

  $: logged_in = data.logged_in;
  $: console.log({ logged_in });

</script>

{#key $page.url.pathname}
<main class="relative flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">

  <nav class="absolute inset-x-0 top-0 w-full border-b-4 px-8 py-4 flex flex-row items-center justify-between">

    <a href="/">
      <button class="font-quicksand text-3xl font-bold">Lophop</button>
    </a>

    {#if logged_in}
      <a href="/dashboard">
        <button class="font-poppins border-2 rounded-xl px-8 py-4 text-xl">
          Dashboard 
        </button>
      </a>
    {:else}
      <a href="/login">
        <button class="font-poppins border-2 rounded-xl px-8 py-4 text-xl">
          Advisor Login
        </button>
      </a>
    {/if}

  </nav>

  <div class="mt-16">
    <slot />
  </div>

</main>
{/key}
