<script>
  import { formatDistance } from "date-fns";
  import { user } from "../stores/user";
  import { markdown } from "../utils/render";
  export let answer;
  import Avatar from "./Avatar.svelte";
</script>

<li>
  <article
    class="uk-comment uk-comment-primary uk-visible-toggle"
    tabindex="-1"
  >
    <header class="uk-comment-header uk-position-relative">
      <div class="uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
          <Avatar name={answer.person.fullName} />
        </div>
        <div class="uk-width-expand">
          <h4 class="uk-comment-title uk-margin-remove">
            {answer.person.fullName}
          </h4>
          <p class="uk-comment-meta uk-margin-remove-top">
            {formatDistance(new Date(answer.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
          {#if $user.id === answer.person.userID}
            <ul class="uk-iconnav uk-position-top-right">
              <li><button uk-icon="icon: plus" /></li>
              <li><button uk-icon="icon: file-edit" /></li>
              <li><button uk-icon="icon: copy" /></li>
              <li><button uk-icon="icon: trash" /></li>
            </ul>
          {/if}
          <hr class="uk-divider-icon" />
        </div>
      </div>
    </header>
    <div class="uk-comment-body">
      <p>
        {@html markdown(answer.answer)}
      </p>
    </div>
  </article>
</li>

<style>
</style>
