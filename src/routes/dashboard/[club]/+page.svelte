<script lang="ts">
  export let data;
  const club = data.club;
  const members = club.members;
  const projects = club.projects;
</script>

<div>
<a href="/dashboard" class="btn btn-accent w-fit">{"<- Dashboard"}</a>
<h2 class="text-center text-5xl my-8 font-poppins font-bold text-primary">Club {club.name}</h2>
</div>

<section class="flex flex-col w-full mx-auto">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Projects</h3>
    <label for="project-modal" class="btn btn-secondary font-quicksand font-bold">+ Create</label>
  </div>
  
  <div class="divider" />
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {#if projects.length > 0}
      {#each projects as project}

        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{project.title}</h2>
            <p class="text-ellipsis text-base-content/80">{project.content ?? "No description yet"}</p>
            <div class="card-actions justify-end">
              <a href={`/dashboard/${club.slug}/p/${project.id}`} class="btn btn-primary">
                Manage
              </a>
            </div>
          </div>
        </div>

      {/each}
    {:else}
      <div class="card w-96 bg-base-300 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">You don't have any projects, yet...</h2>
          <p>Create a new project using the button below!</p>
          <div class="card-actions justify-end">
            <label for="project-modal" class="btn btn-secondary font-quicksand font-bold">+ Create</label>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<section class="flex flex-col w-full mx-auto">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Members</h3>
    <label for="member-modal" class="btn btn-secondary font-quicksand font-bold">+ Add New</label>
  </div>

  <div class="divider" />

  <div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Latest Submission</th>
          <th>Scratch Password</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {#each members as member}

          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={`/abstract-characters/abstract-character-${member.avatar}.svg`} alt={`Member Avatar - ${member.name}`}/>
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
                <form method="POST">
                  <input name="id" type="hidden" value={member.id} />
                  <button class="btn btn-outline btn-info btn-xs">Edit</button>
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
  <form method="POST" action="?/createMember" class="form-control modal-box relative gap-4">
    <label for="member-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="font-bold text-lg">Create a New Member</h3>
    <div>
      <label class="label">
        <span class="label-text">Name</span> 
      </label>
      <input name="name" type="text" class="w-full input input-bordered" />
    </div>
    <div class="modal-action">
      <label for="member-modal">
        <button class="btn btn-accent">Done</button>
      </label>
    </div>
  </form>
</div>
