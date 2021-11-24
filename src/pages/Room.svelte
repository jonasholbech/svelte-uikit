<script>
  import { navigate } from "svelte-routing";
  import { onMount, onDestroy } from "svelte";
  import { isLoggedIn } from "../stores/user";

  $: !$isLoggedIn && navigate("/", { replace: true });
  let interval = null;
  onMount(() => {
    interval = setInterval(getData, 5000);
  });
  onDestroy(() => {
    clearInterval(interval);
    interval = null;
  });
  async function getData() {}

  export let slug;
</script>

<h2>{slug}</h2>
