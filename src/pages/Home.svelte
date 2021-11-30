<script>
  import netlifyIdentity from "netlify-identity-widget";
  import { Link } from "svelte-routing";
  import { user, isLoggedIn, role } from "../stores/user";
  import { canAccess } from "../utils/identity";
  import { rooms } from "../stores/rooms";
  import { getRooms } from "../utils/crud";
  //let rooms = [];

  $: userStatusChanged = $isLoggedIn ? getRoomsWrapper() : rooms.set([]);
  async function getRoomsWrapper() {
    const data = await getRooms($user);

    rooms.set(data.rooms);
  }
</script>

<h2>Available Rooms</h2>
<ul class="uk-list uk-list-divider uk-list-striped">
  {#each $rooms as room (room.id)}
    <li><Link to={`room/${room.slug}`} name={room.name}>{room.name}</Link></li>
  {/each}
</ul>
{#if $rooms.length === 0}
  <p>There are no rooms yet.</p>
  {#if canAccess($role, "moderator")}
    <button
      uk-toggle="target: #my-id"
      type="button"
      class="uk-button uk-button-default">Create Room</button
    >
  {:else}
    <p>Wait for someone to create one</p>
  {/if}
{/if}

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
