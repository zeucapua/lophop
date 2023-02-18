<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { goto } from "$app/navigation";
  import type { Advisor } from "@prisma/client";
  import type { ActionData } from "./$types";

  const auth_context = getContext("authorizerContext")
  let advisor : Advisor | null;
  let auth_store : { token: string; user: any; loading: boolean; logout: Function; };

  auth_context.subscribe((data : any) => { auth_store = data; });

  onMount(async () => {
    advisor = await getAdvisor();
  });

  async function getAdvisor() {
    console.log({ auth_store });
    
    const response = await fetch("/api/prisma/get-advisor", {
      method: "POST",
      body: JSON.stringify({ auth_id: auth_store.user?.id }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    console.log("getAdvisor", data);
    return data.data;
  }
  
  async function logout() { 
    await auth_store.logout(); 
    goto("/");
  }
</script>

<p>Dashboard</p>
{#if advisor === null}
  <form method="POST">
    <label>
      What's your name?
      <input name="name" type="text" />
    </label>
    <input name="auth_id" type="hidden" value={auth_store.user?.id} />
  </form>
{:else}
  <p>{advisor?.name}</p>
  <p>{advisor?.auth_id}</p>
  <button on:click={logout}>Logout</button>
{/if}
