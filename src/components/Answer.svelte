<script>
  import { formatDistance } from "date-fns";
  import { onMount } from "svelte";
  import { user } from "../stores/user";
  import { markdown } from "../utils/render";
  export let answer;
  export let deleteAnswer;
  import Avatar from "./Avatar.svelte";
  let el;
  onMount(() => {
    Prism.highlightAll();
    //TODO: highlighter for hvert answer og ikke ved nyt question
  });
</script>

<li bind:this={el}>
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
              <li>
                <button
                  uk-icon="icon: trash"
                  on:click={() => deleteAnswer(answer.id)}
                />
              </li>
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
