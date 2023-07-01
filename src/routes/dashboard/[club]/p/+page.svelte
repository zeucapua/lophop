<script lang="ts">
  import type { Submission } from '@prisma/client';
  import ScratchEmbed from '$lib/ScratchEmbed.svelte';

  export let data;

  const club = data.club;
  let project = data.project;
  let submissions = data.submissions;
  let current_submission : Submission;

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
    <div class="flex flex-col divide-x lg:flex-row w-full h-full p-4 gap-4 border rounded-md">
      <div class="basis-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto">
        {#each submissions as submission}
          <div class="flex flex-row w-md p-4 gap-4 border rounded-md items-center">
            <input class="peer radio" type="radio" bind:group={current_submission} value={submission} /> 
            <div class="peer-checked:font-bold flex flex-col">
              <p class="text-ellipsis">{submission.title}</p>
              <p class="text-secondary">{submission.member.name}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="w-full h-full basis-2/3 p-8">
        {#if current_submission}
          <ScratchEmbed submission={current_submission} />
          <form method="POST" action="?/deleteSubmission">
            <input name="submission_id" type="hidden" value={current_submission.id} />
            <input name="project_id" type="hidden" value={project.id} />
            <button class="btn btn-outline btn-error">Delete</button>
          </form>
        {/if}
      </div>
    </div>
  {:else}
    <p class="font-quicksand font-bold text-center">No one has submitted a project yet.</p> 
  {/if}
</section>
