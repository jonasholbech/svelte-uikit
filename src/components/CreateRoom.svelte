<script>
  import { canAccess } from "../utils/identity";
  import { role, user } from "../stores/user";
  import slugify from "slugify";
  let room = "";
  let promise = null;
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
</script>

{#if canAccess($role, "moderator")}
  <div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Create Room</h2>
      <form on:submit|preventDefault={() => (promise = post())}>
        <div class="uk-margin">
          {#if promise !== null}
            {#await promise}
              <div uk-spinner />
            {:then response}
              <p>
                <strong>{response.data.createRoom.name}</strong> was created
              </p>
            {:catch error}
              <p style="color: red">{error.message}</p>
            {/await}
          {/if}
          <label
            >Room Name
            <input
              bind:value={room}
              class="uk-input"
              required
              type="text"
              placeholder="2nd sem autumn 22"
            />
          </label>
          {#if room.length > 3}
            <button class="uk-button uk-button-primary">Save</button>
          {:else}
            <button class="uk-button uk-button-disabled">Save</button>
          {/if}
        </div>
      </form>

      <button class="uk-modal-close uk-button-secondary uk-button" type="button"
        >X</button
      >
    </div>
  </div>
{/if}
