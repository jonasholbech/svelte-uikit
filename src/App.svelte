<script>
  import netlifyIdentity from "netlify-identity-widget";
  import { onMount } from "svelte";
  import { user, isLoggedIn, firstVisit, role } from "./stores/user";
  import { setupIdentity, canAccess } from "./utils/identity";
  import { getRooms } from "./utils/crud";
  import CreateRoom from "./components/CreateRoom.svelte";

  let rooms = [];

  $: userStatusChanged = $isLoggedIn ? getRoomsWrapper() : (rooms = []);
  async function getRoomsWrapper() {
    const data = await getRooms($user);
    console.log(data);
    rooms = data.rooms;
  }
  onMount(async () => {
    setupIdentity();
  });
  function handleLoginButton() {
    if ($isLoggedIn) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  }
  console.log($role);
</script>

<nav class="uk-navbar-container" uk-navbar>
  <div class="uk-navbar-left">
    <ul class="uk-navbar-nav">
      <li>
        <button
          class="uk-button uk-button-primary"
          on:click={handleLoginButton}
        >
          {$isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </li>
      {#if canAccess($role, "moderator")}
        <li>
          <button
            uk-toggle="target: #my-id"
            type="button"
            class="uk-button uk-button-default">Create Room</button
          >
        </li>
      {/if}
    </ul>
  </div>
</nav>

<main>
  {#if $user}
    <h1>
      Hi {$user.user_metadata.full_name}, {$firstVisit
        ? "good to meet you"
        : "welcome back"}
    </h1>
  {/if}
</main>
<CreateRoom />
<h2>Available Rooms</h2>
{#each rooms as room (room.id)}
  <h3>{room.name}</h3>
{/each}

<style>
  li {
    padding: 1rem;
  }
</style>
