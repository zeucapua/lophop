<script lang="ts">
  import type { Member } from "@prisma/client";
  import AttendanceCheckbox from "./AttendanceCheckbox.svelte";

  export let data;
  const club = data.club;
  const members = club.members;
  const projects = club.projects;

  let editing_member : Member;
</script>

<div>
  <a href="/dashboard" class="font-quicksand btn btn-accent w-fit">Dashboard</a>
  <h2 class="text-center text-5xl my-8 font-poppins font-bold text-primary">Club {club.name}</h2>
</div>

<section class="flex flex-col w-full mx-auto">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Projects</h3>
    <label for="project-modal" class="btn btn-accent font-quicksand font-bold">+ Create Project</label>
  </div>
  
  <div class="divider" />
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {#if projects.length > 0}
      {#each projects as project}

        <div class="card w-96 bg-neutral shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{project.title}</h2>
            <p class="truncate text-base-content/80">{project.content ?? "No description yet"}</p>
            <div class="card-actions justify-end">
              <a href={`/dashboard/${club.slug}/p/${project.id}`} class="btn btn-secondary">
                Manage
              </a>
            </div>
          </div>
        </div>

      {/each}
    {:else}
      <div class="card w-96 bg-neutral shadow-xl">
        <div class="card-body">
          <h2 class="card-title">You don't have any projects, yet...</h2>
          <p>Create a new project using the button below!</p>
          <div class="card-actions justify-end">
            <label for="project-modal" class="btn btn-accent font-quicksand font-bold">+ Create Project</label>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<section class="flex flex-col w-full mx-auto">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Members</h3>
    <label for="member-modal" class="btn btn-accent font-quicksand font-bold">+ Add Members</label>
  </div>

  <div class="divider" />

  <div class="overflow-x-auto w-full">
    <table class="table bg-neutral w-full">
      <thead>
        <tr>
          <th>Attendance</th>
          <th>Name</th>
          <th>Latest Submission</th>
          <th>Scratch Password</th>
        </tr>
      </thead>

      <tbody>
        {#each members as member}

          <tr>
            <th>
              <AttendanceCheckbox {member} club_slug={club.slug} />
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img 
                      src={`https://source.boringavatars.com/beam/64/${member.name}?colors=e779c1,58c7f3,22155,1a103c,f3cc30`} 
                      alt={`Member Avatar - ${member.name}`}
                    />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{member.name}</div>
                  <div class="text-sm opacity-50">username</div>
                </div>
              </div>
            </td>

            <td>
              Walking Around
              <br/>
              <span class="badge badge-ghost badge-sm">Submitted</span>
            </td>

            <td>Purple</td>
            <th>
              <div class="flex flex-row gap-4">
                <button on:click={() => editing_member = member} class="btn btn-outline btn-secondary btn-xs"> 
                  <label for="edit-modal" class="cursor-pointer">
                    Edit
                  </label>
                </button>
                <form method="POST">
                  <input name="id" type="hidden" value={member.id} />
                  <button formaction="?/deleteMember" class="btn btn-outline btn-error btn-xs">Delete</button>
                </form>
              </div>
            </th>
          </tr>

        {/each}
      </tbody>
    </table>
  </div>
</section>


<input type="checkbox" id="project-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <form method="POST" action="?/createProject" class="form-control modal-box relative gap-4">
    <label for="project-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="font-bold text-lg">Create a Project</h3>
    <div>
      <label class="label">
        <span class="label-text">Title</span> 
      </label>
      <input name="title" type="text" class="w-full input input-bordered" />
      
    </div>
    <div class="modal-action">
      <label for="project-modal">
        <button class="btn btn-accent">Done</button>
      </label>
    </div>
  </form>
</div>

<input type="checkbox" id="member-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative gap-4">
    <label for="member-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <form method="POST" action="?/createMember" class="form-control gap-2">
      <h3 class="font-bold text-lg font-poppins">Add One Member</h3>
      <div>
        <label class="label">
          <span class="label-text">Name</span> 
        </label>
        <input name="name" type="text" class="w-full input input-bordered" />
      </div>
      <div class="modal-action">
        <label for="member-modal">
          <button class="btn btn-accent">Create</button>
        </label>
      </div>
    </form>
    <div class="divider">OR</div>
    <form method="POST" action="?/createMembers" enctype="multipart/form-data" class="form-control align-start gap-2">
      <h3 class="font-bold text-lg font-poppins">Add Multiple Members</h3>
      <p>You can add multiple members using a text or CSV file with each name on a new line. See an example below:</p>
      <samp class="border rounded-lg p-4 bg-neutral">
        Jane Doe<br />
        Dan Olson<br />
        Barry<br />
        Blinky Ghost<br />
      </samp>
      <div>
        <label class="label">
          <span class="label-text">Import CSV/TXT File</span>
        </label>
      </div>
      <input name="file" type="file" class="file-input file-input-bordered w-full" />
      <div class="modal-action">
        <label for="member-modal">
          <button class="btn btn-accent">Upload</button>
        </label>
      </div>
    </form>
  </div>
</div>

<input type="checkbox" id="edit-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative gap-4">
    <label for="edit-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <form method="POST" action="?/updateMember" class="form-control align-start">
      <h3 class="font-bold text-lg font-poppins">Edit Member</h3>
      <label class="label">
        <span class="label-text">Member Name</span>
      </label>
      <input 
        name="name" type="text" value={editing_member?.name} 
        class="input input-bordered input-primary" 
      />
      <input name="club_slug" type="hidden" value={club.slug} />
      <input name="id" type="hidden" value={editing_member?.id} />
      <div class="modal-action">
        <label for="edit-modal">
          <button class="btn btn-accent">Confirm</button>
        </label>
      </div>
    </form>
  </div>
</div>
