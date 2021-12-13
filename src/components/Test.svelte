<script>
  import fsm from "svelte-fsm";
  let value = "";
  let formEl;
  const form = fsm("idle", {
    idle: {
      input() {
        if (formEl.checkValidity()) {
          return "valid";
        } else {
          return "invalid";
        }
      },
    },
    invalid: {
      input() {
        if (formEl.checkValidity()) {
          return "valid";
        }
      },
    },
    valid: {
      input() {
        if (!formEl.checkValidity()) {
          return "invalid";
        }
      },
      submit: "posting",
    },
    posting: {
      _enter() {
        console.log("posting");
        let promise = new Promise((resolve, reject) => {
          const r = Math.random();
          if (r > 0.5) {
            this.success.debounce(1000);
          } else {
            this.error.debounce(1000, "test");
          }
        });
      },
      success: "completed",
      error(err) {
        console.log(err);
        return "valid";
      },
    },
    completed: {
      _enter() {
        value = "";
        this.idle;
      },
    },
  });
</script>

<h2>{$form}</h2>
<form bind:this={formEl} on:submit|preventDefault={form.submit}>
  <label>
    <input bind:value required type="email" on:input={form.input} />
  </label>
  <button>Submit</button>
</form>
<button on:click={form.submit}>submit()</button>
<button on:click={form.input}>input()</button>
