<script>
  import fsm from "svelte-fsm";
  import { canAccess } from "../utils/identity";
  import { role, user } from "../stores/user";
  import { rooms } from "../stores/rooms";
  import slugify from "slugify";
  let room = "";
  let response = null;
  async function post(e) {
    const query = {
      query: `mutation AddRoom($name:String!, $userID:String!, $slug:String!) {
  createRoom (data:{
    name: $name
    slug:$slug
    person: {
      connect: {
        userID: $userID
      }
    }
  }){
    name
    id
    slug
  }
}`,
      variables: {
        userID: $user.id,
        name: room,
        slug: slugify(room), //TODO: det her sikrer ikke at det er unikt
      },
    };
    const resp = await fetch("/api/gql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${$user.token.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    return await resp.json();
  }
  let error;

  const form = fsm("entering", {
    entering: {
      submit: "submitting",
    },

    submitting: {
      async _enter() {
        response = "creating";
        try {
          response = await post();
          rooms.update((old) => old.concat(response.data.createRoom));
          room = "";
          return "success";
        } catch (err) {
          return "error";
        }
      },

      success: "completed",

      error(err) {
        error = err;
        return "invalid";
      },
    },
    invalid: {
      input: "entering",
    },

    completed: {},
  });
</script>

{#if canAccess($role, "moderator")}
  <div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Create Room {$form}</h2>
      <form on:submit|preventDefault={form.submit}>
        <div class="uk-margin fields">
          {#if error}
            <p>{error}</p>
          {/if}
          {#if response}
            <div class="response">
              {#if response === "creating"}
                <div uk-spinner />
              {:else}
                <p>
                  <strong>{response.data.createRoom.name}</strong> was created
                </p>
              {/if}
            </div>
          {/if}
          <label
            >Room Name
            <input
              bind:value={room}
              class="uk-input"
              required
              on:input={form.input}
              type="text"
              placeholder="2nd sem autumn 22"
            />
          </label>
          <button
            class="uk-button uk-button-primary"
            type="submit"
            disabled={$form !== "entering" || room.length < 3}>Submit</button
          >

          <!-- {#if room.length > 3}
            <button class="uk-button uk-button-primary">Save</button>
          {:else}
            <button class="uk-button uk-button-disabled">Save</button>
          {/if} -->
        </div>
      </form>

      <button
        class="uk-modal-close uk-button-secondary uk-button uk-align-right"
        type="button">X</button
      >
    </div>
  </div>
{/if}

<style>
  /*
  mere elegant, noget a la
  input,
      label {
        display: block;
      }
      #app {
        display: flex;
        flex-wrap: wrap;
        align-items: end;
        gap: 1rem;
      }
      input {
        width: 100%;
      }
      label {
        flex-grow: 2;
      }
      h2 {
        width: 100%;
      }
  */
  .fields {
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 1rem;
    align-items: end;
  }
  .response {
    grid-column: 1/-1;
  }
</style>
