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
