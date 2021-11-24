<script>
  import { user, firstVisit } from "../stores/user";
</script>

{#if $firstVisit}
  <div class="uk-card uk-card-body uk-card-default uk-card-hover">
    <div class="uk-card-header">
      <h3 class="uk-card-title">
        Hi {$user.user_metadata.full_name}, {$firstVisit
          ? "good to meet you"
          : "welcome back"}
      </h3>
    </div>
    <div class="uk-card-body">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        tempora architecto cum vero recusandae numquam perspiciatis doloribus
        optio similique velit eius illo, ut animi veritatis temporibus sequi.
        Tempora, officiis animi?
      </p>
    </div>
    <div class="uk-card-footer">
      <button
        class="uk-button uk-button-secondary uk-align-right"
        on:click={() => firstVisit.set(false)}>Close</button
      >
    </div>
  </div>
{/if}
