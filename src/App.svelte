<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { user, isLoggedIn, role } from "./stores/user";
  import { setupIdentity } from "./utils/identity";

  import Nav from "./components/Nav.svelte";
  import Greeting from "./components/Greeting.svelte";
  import Room from "./pages/Room.svelte";
  import Home from "./pages/Home.svelte";

  onMount(async () => {
    setupIdentity();
  });
  export let url = "";
</script>

<Router {url}>
  <Nav />

  <main>
    <Greeting />
    <Route path="/" component={Home} />
    <Route path="room/:slug" component={Room} />
  </main>
</Router>

<style>
  main {
    margin-top: 1rem;
  }
</style>
