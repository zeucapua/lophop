<script lang="ts">
  import "../app.css";
</script>

<main class="relative flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">

  <nav class="absolute inset-x-0 top-0 w-full border-b-4 px-8 py-4 flex flex-row items-center justify-between">

    <a href="/" data-sveltekit-reload>
      <button class="font-quicksand text-3xl font-bold">Lophop</button>
    </a>

    <a href="/dashboard" data-sveltekit-reload>
      <button class="font-poppins border-2 rounded-xl px-8 py-4 text-xl">
        Dashboard 
      </button>
    </a>

  </nav>

  <div class="mt-16">
    <slot />
  </div>

</main>
