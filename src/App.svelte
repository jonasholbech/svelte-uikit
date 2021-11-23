<script>
  import { onMount } from "svelte";
  import { user, isLoggedIn } from "./stores/user";
  import netlifyIdentity from "netlify-identity-widget";

  onMount(async () => {
    netlifyIdentity.on("init", async (user) => {
      console.log("init ran, doing nothing");
    });
    netlifyIdentity.on("login", async (authUser) => {
      console.log("login ran", authUser);
      user.set(authUser);
      isLoggedIn.set(true);
      netlifyIdentity.refresh().then((jwt) => {});
    });
    netlifyIdentity.on("logout", async () => {
      console.log("logout ran");
      user.set(null);
      isLoggedIn.set(false);
    });
    netlifyIdentity.on("error", (err) => console.error("Error", err));
    netlifyIdentity.on("open", () => console.log("Widget opened"));
    netlifyIdentity.on("close", () => console.log("Widget closed"));
    //apparently, register eventlisteners before init
    netlifyIdentity.init();
    console.log("init");
  });
  function handleLoginButton() {
    if ($isLoggedIn) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  }
  console.log(user);
</script>

<main>
  <button class="uk-button uk-button-primary" on:click={handleLoginButton}>
    Primary
  </button>
  {#if $user}
    <h1>Hi {$user.user_metadata.full_name}</h1>
  {/if}
</main>

<style>
</style>
