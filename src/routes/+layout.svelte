<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  export let data;
  const user = data.session?.user;

  console.log($page);
</script>

<main class="flex flex-col w-full h-full min-w-screen min-h-screen bg-base-100 p-8 lg:p-16 gap-8">
  
  <!-- Navbar -->
  <section class="navbar shadow-xl bg-neutral rounded-lg items-center">
    <div class="flex-1 p-4">
      <a href="/">
        <h1 class="btn btn-ghost font-poppins normal-case text-primary text-5xl font-bold">
          Lophop
        </h1>
      </a>
    </div>

    <div class="flex-none px-4">
      {#if !user}
        <button on:click={() => signIn("github")} class="font-quicksand btn btn-secondary">
          Log in with Github 
        </button>
      {:else}
        <div class="dropdown dropdown-end">
          <label tabindex="-1" class="btn btn-ghost btn-circle avatar">
            <img src={user.image} alt={``} class="w-12 rounded-full" />
          </label>
          <ul tabindex="-1" class="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box border-2 border-base-200 w-fit">
            <li><a href="/dashboard">Dashboard</a></li>
            <li class="text-error"><button on:click={() => signOut()}>Logout</button></li>
          </ul>
        </div>
      {/if}
    </div>
  </section>

  <!-- children +page.svelte -->
  <slot />

</main>
