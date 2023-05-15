<script lang="ts">
  import { enhance } from "$app/forms";

  export let data; 
  export let form;

  let user = data.user;
  let clubs = data.clubs;

  let modal_action : string;

  $: final_slug = setFinalSlug(modal_action);
  function setFinalSlug(action : string) {
    if (action === "join") { return form?.slug }
    else if (action === "create") { return form?.slug_variation ?? form?.slug; }
  }
</script>

<h2 class="text-center text-5xl my-8 font-poppins font-bold text-primary">Dashboard</h2>

<section class="flex flex-col w-full mx-auto">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Clubs</h3>
    <label for="create-modal" class="btn btn-secondary font-quicksand font-bold">New Club</label>
  </div>

  <div class="divider" />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {#each clubs as club}
      <div class="card border border-neutral w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title font-poppins">{club.name}</h2>
          <h3 class="text-secondary font-quicksand font-bold">{club.slug}</h3>
          <div class="card-actions justify-end">
            <button class="btn btn-accent font-quicksand">Details</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="create-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <form method="POST" class="form-control modal-box relative gap-4" use:enhance>
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="font-bold text-lg">Create a New Club</h3>
    <div>
      <label class="label">
        <span class="label-text">What's the Club called?</span>
      </label>
      <input 
        name="club_name" 
        placeholder="Awesome Wizards" 
        class="input input-bordered w-full"
        value={form?.club_name || ""}
      />
    </div>
    <button formaction="?/findClub" class="btn">Find Club</button>
    {#if form}
      {#if form.status === "present"}

        <div class="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>You are already in lophop.club/{form.slug}</span>
          </div>
        </div>

      {:else if form.status === "found"}

        <div class="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Club already exists at lophop.club/{form.slug}</span>
          </div>
        </div>
        
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Join club at lophop.club/{form.slug}</span> 
            <input bind:group={modal_action} value="join" type="radio" class="radio radio-acccent" />
          </label>
        </div>

      {:else if form.status === "available"}
        
        <div class="alert alert-success shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Club available at lophop.club/{form.slug}</span>
          </div>
        </div>

      {/if}
      
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Create new club at lophop.club/{form.slug_variation ?? form.slug}</span> 
          <input bind:group={modal_action} value="create" type="radio" class="radio radio-accent" />
        </label>
      </div>

      <input name="final_slug" type="hidden" value={final_slug} />

      {#if modal_action}
        {#if form.unmatched}
          <div class="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Secrets NOT matching!</span>
            </div>
          </div>
        {/if}

        <input name="final_slug" type="hidden" value={final_slug} />

        <div>
          <label class="label">
            <span class="label-text">Set a Secret for members</span>
          </label>
          <div class="flex flex-col gap-2">
            <input 
              name="secret" type="text" placeholder="Secret Word" 
              class="input input-bordered input-accent w-full" 
            />
            <input 
              name="confirm_secret" type="text" placeholder="Confirm Secret Word" 
              class="input input-bordered input-accent w-full" 
            />
          </div>
        </div>

        <button data-sveltekit-replacestate class="btn btn-primary" formaction={`?/${modal_action}Club`}>
          {modal_action}
        </button>
      {/if}

    {/if}
  </form>
</div>
