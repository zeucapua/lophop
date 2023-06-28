<script lang="ts">
  import ScratchEmbed from '$lib/ScratchEmbed.svelte';
  export let data;

  const club = data.club;
  let project = data.project;
  let submissions = data.submissions;

</script>

<a href={`/dashboard/${club}`} class="btn btn-outline btn-secondary w-fit">Dashboard</a>

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
      <button class="btn btn-outline btn-error font-quicksand" formaction="?/deleteProject">Delete</button>
      <button class="btn btn-primary font-quicksand" formaction="?/saveProject">Save</button>
    </div>
  </div>
  <label class="label">
    <span class="label-text text-lg text-base-content/80">Content</span>
  </label>
  <textarea 
    name="content" value={project.content} 
    class="scroll-p-8 resize-none text-xl textarea textarea-bordered w-full " 
  />
  <input name="project_id" type="hidden" value={project.id} />
</form>

<section>
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Submissions</h3>
  </div>
  <div class="divider" />
  {#if submissions.length > 0}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-4">
      {#each submissions as submission}
        <div class="relative">
          <form method="POST" action="?/deleteSubmission" class="absolute z-20 self-end -right-2 -top-4"> 
            <input name="submission_id" type="hidden" value={submission.id} />
            <button class="btn btn-error">
              Delete
            </button>
          </form>
          <span class="z-10">
            <ScratchEmbed {submission} />
          </span>
        </div>
      {/each}
    </div>
  {:else}
    <p class="font-quicksand font-bold text-center">No one has submitted a project yet.</p> 
  {/if}
</section>
