<script lang="ts">
  export let data;
  const { club, member } = data;
</script>

<main class="flex flex-col w-full gap-8">
  <section class="flex flex-row justify-between items-center">
    <h1 class="text-3xl font-poppins text-primary font-bold">Club {club?.name}</h1>
    <div class="flex flex-row items-center gap-4">
      <div class="flex-none px-4">
        <div class="dropdown dropdown-end">
          <label tabindex="-1" class="btn btn-ghost btn-circle avatar">
            <img 
              src={`https://source.boringavatars.com/beam/64/${member.name}?colors=e779c1,58c7f3,22155,1a103c,f3cc30`}
              alt={`Member Avatar`} class="w-12 rounded-full" 
            />
          </label>
          <ul tabindex="-1" class="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box border-2 border-base-200 w-fit">
            <li>
              <label for="account-modal">
                Account
              </label>
            </li>
            <li class="text-error">
              <form method="POST" action="?/logout">
                <button>Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <slot />
</main>

<input type="checkbox" id="account-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative gap-4">
    <label for="account-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="text-lg font-bold font-poppins">Scratch Account</h3>
    <h5 class="text-md font-bold font-quicksand">Username</h5>
    <div class="flex flex-row justify-between items-center">
      <p class="font-quicksand">{member.scratch?.username}</p> 
      <button on:click={() => { navigator.clipboard.writeText(member.scratch?.username) }} class="btn btn-secondary">
        Copy
      </button>
    </div>
    <h5 class="text-md font-bold font-quicksand">Password</h5>
    <div class="flex flex-row justify-between items-center">
      <p class="font-quicksand">{member.scratch?.password}</p> 
      <button on:click={() => { navigator.clipboard.writeText(member.scratch?.password) }} class="btn btn-secondary">
        Copy
      </button>
    </div>
  </div>
</div>
