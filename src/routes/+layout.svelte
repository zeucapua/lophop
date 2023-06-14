<script>
  import "../app.css";
  import { goto } from "$app/navigation";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
   
  // Vercel analytics
  inject({ mode: dev ? 'development' : 'production' });

  export let data;
  const user = data.session?.user;

  function logout() {
    goto("/");
    signOut();
  }
</script>

<svelte:head>
  <title>Lophop: Hop into Coding Fun</title>
</svelte:head>

<main class="space-y-16 flex flex-col w-full h-full min-w-screen min-h-screen bg-base-100 p-8 lg:p-16 gap-8">
  
  <!-- Navbar -->
  <section class="fixed inset-x-0 top-0 navbar shadow-xl bg-neutral rounded-lg items-center">
    <div class="flex-1 p-4">
      <a href="/">
        <h1 class="btn btn-ghost font-poppins normal-case text-primary text-5xl font-bold">
          Lophop
          <div class="badge badge-secondary badge-outline">Alpha</div>
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
            <li class="text-error"><button on:click={logout}>Logout</button></li>
          </ul>
        </div>
      {/if}
    </div>
  </section>

  <!-- children +toppage.svelte -->
  <div class="flex flex-col gap-8">
    <slot />
  </div>

</main>
