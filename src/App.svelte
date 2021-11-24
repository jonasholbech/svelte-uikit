<script>
  import netlifyIdentity from "netlify-identity-widget";
  import { onMount } from "svelte";
  import { user, isLoggedIn, firstVisit, role } from "./stores/user";
  import { setupIdentity, canAccess } from "./utils/identity";

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

<main>
  <button class="uk-button uk-button-primary" on:click={handleLoginButton}>
    {$isLoggedIn ? "Log Out" : "Log In"}
  </button>
  {#if canAccess($role, "moderator")}
    <button class="uk-button uk-button-primary">Create Room</button>
  {/if}
  {#if $user}
    <h1>
      Hi {$user.user_metadata.full_name}, {$firstVisit
        ? "good to meet you"
        : "welcome back"}
    </h1>
  {/if}
</main>

<style>
</style>
