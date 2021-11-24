<script>
  import netlifyIdentity from "netlify-identity-widget";
  import { Link } from "svelte-routing";
  import { user, isLoggedIn } from "../stores/user";
  import { getRooms } from "../utils/crud";
  let rooms = [];

  $: userStatusChanged = $isLoggedIn ? getRoomsWrapper() : (rooms = []);
  async function getRoomsWrapper() {
    const data = await getRooms($user);
    console.log(data);
    rooms = data.rooms;
  }
</script>

<h2>Available Rooms</h2>
<ul class="uk-list uk-list-divider uk-list-striped">
  {#each rooms as room (room.id)}
    <li><Link to={`room/${room.slug}`} name={room.name}>{room.name}</Link></li>
  {/each}
</ul>
{#if !$isLoggedIn}
  <p>
    Please <a
      href="#/"
      on:click|preventDefault={() => {
        netlifyIdentity.open();
      }}>sign in to continue</a
    >
  </p>
{/if}

<style>
</style>
