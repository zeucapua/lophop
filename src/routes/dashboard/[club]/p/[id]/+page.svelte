<script lang="ts">
  import ScratchEmbed from '$lib/ScratchEmbed.svelte';
  export let data;

  const club = data.club;
  let project = data.project;
  let submissions = data.submissions;
</script>

<a href={`/dashboard/${club}`} class="">Dashboard</a>

<form method="POST">
  <div class="flex flex-row justify-between items-center">
    <div>
      <label class="label">
        <span class="label-text text-lg text-base-content/80">Title</span>
      </label>
      <input 
        name="title" type="text" value={project.title} 
        class="text-2xl input input-primary input-lg input-bordered" 
      />
    </div>
    <div>
      <button class="btn btn-outline btn-error" formaction="?/deleteProject">Delete</button>
      <button class="btn btn-primary" formaction="?/saveProject">Save</button>
    </div>
  </div>
  <label class="label">
    <span class="label-text text-lg text-base-content/80">Content</span>
  </label>
  <textarea 
    name="content" value={project.content} 
    class="scroll-p-8 resize-none text-xl textarea textarea-bordered w-full " 
  />
</form>

<section>
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Submissions</h3>
  </div>
  <div class="divider" />
  {#if submissions.length > 0}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-4">
      {#each submissions as submission}
        <ScratchEmbed {submission} />
      {/each}
    </div>
  {:else}
    <p class="font-quicksand font-bold text-center">No one has submitted a project yet. Be the first!</p> 
  {/if}
</section>
