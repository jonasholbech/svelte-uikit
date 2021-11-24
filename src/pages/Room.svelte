<script>
  import { Route, navigate } from "svelte-routing";
  import { user, isLoggedIn } from "../stores/user";
  $: !isLoggedIn && navigate("/");
  export let id;
</script>

<h1>I'm a room: {id}</h1>
