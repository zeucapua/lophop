<script lang="ts">
  import ScratchEmbed from '$lib/ScratchEmbed.svelte';
  import { Submission } from "@prisma/client";

  export let data;
  const project = data.project;
  const submissions = data.submissions;
  const member = data.member;

  let current_submission : Submission;
</script>

<a href={`/${data.club.slug}/home`} class="font-quicksand w-fit btn btn-accent">Home</a>
<h2 class="text-center text-5xl font-poppins font-bold text-primary">{project.title}</h2>
<p class="text-xl font-quicksand">{project.content}</p>

<section>
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Submissions</h3>
    <label for="submission-modal" class="btn btn-primary font-quicksand">
      Submit
    </label>
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
    <p class="font-quicksand font-bold text-center">No one has submitted a project yet. Be the first!</p> 
  {/if}
</section>

<input type="checkbox" id="submission-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <form method="POST" action="?/submitProject" class="form-control modal-box relative gap-4">
    <label for="submission-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="font-bold text-lg">Submit a Project</h3>
    <div>
      <label class="label">
        <span class="label-text">Title</span> 
      </label>
      <input required name="title" type="text" class="w-full input input-bordered" />
    </div>
    <div>
      <label class="label">
        <span class="label-text">Link</span> 
      </label>
      <input required name="link" type="url" class="w-full input input-bordered" />
    </div>
    <input name="member_id" type="hidden" value={member?.id} />
    <input name="project_id" type="hidden" value={project.id} />
    <div class="modal-action">
      <label for="submission-modal">
        <button class="btn btn-accent">Done</button>
      </label>
    </div>
  </form>
</div>
