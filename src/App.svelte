<script>
  import { onMount } from "svelte";
  import netlifyIdentity from "netlify-identity-widget";
  let isLoggedIn = false;
  let user = null;
  onMount(() => {
    netlifyIdentity.on("init", (user) => {
      console.log("init ran, doing nothing");
    });
    netlifyIdentity.on("login", (authUser) => {
      console.log("login ran");
      user = authUser;
      isLoggedIn = true;
      netlifyIdentity.refresh().then((jwt) => console.log(jwt));
    });
    netlifyIdentity.on("logout", () => {
      console.log("logout ran");
      user = null;
      isLoggedIn = false;
    });
    netlifyIdentity.on("error", (err) => console.error("Error", err));
    netlifyIdentity.on("open", () => console.log("Widget opened"));
    netlifyIdentity.on("close", () => console.log("Widget closed"));
    //apparently, register eventlisteners before init
    netlifyIdentity.init();
    console.log("init");
  });
  function handleLoginButton() {
    if (isLoggedIn) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  }
</script>

<main>
  <button class="uk-button uk-button-primary" on:click={handleLoginButton}
    >Primary</button
  >
</main>

<style>
</style>
