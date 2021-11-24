<script>
  import netlifyIdentity from "netlify-identity-widget";
  import { Link } from "svelte-routing";
  import { isLoggedIn, role } from "../stores/user";
  import { canAccess } from "../utils/identity";
  import CreateRoom from "./CreateRoom.svelte";
  function handleLoginButton() {
    if ($isLoggedIn) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  }
</script>

<nav class="uk-navbar-container" uk-navbar>
  <Link class="home" to="/">Home</Link>

  {#if $isLoggedIn && canAccess($role, "moderator")}
    <button
      uk-toggle="target: #my-id"
      type="button"
      class="uk-button uk-button-default">Create Room</button
    >
  {/if}
  <button class="uk-button uk-button-primary" on:click={handleLoginButton}>
    {$isLoggedIn ? "Log Out" : "Log In"}
  </button>
</nav>
<CreateRoom />

<style>
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
  }

  button:first-of-type {
    margin-left: auto;
  }
</style>
