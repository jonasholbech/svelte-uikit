<script>
  import netlifyIdentity from "netlify-identity-widget";
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { user, isLoggedIn, firstVisit, role } from "./stores/user";
  import { setupIdentity, canAccess } from "./utils/identity";
  import { getRooms } from "./utils/crud";
  import CreateRoom from "./components/CreateRoom.svelte";
  import Room from "./pages/Room.svelte";

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
  export let url = "";
  /*
  <Route path="blog/:id" component={BlogPost} />
    <Route path="blog" component={Blog} />
    <Route path="about" component={About} />
    <Route path="/"><Home /></Route>
  */
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

<Router {url}>
  <Route path="room/:id" component={Room} />
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
    <Link to={`room/${room.id}`}>{room.name}</Link>
  {/each}
</Router>

<style>
  li {
    padding: 1rem;
  }
</style>
