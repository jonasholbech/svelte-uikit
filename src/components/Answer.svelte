<script>
  import { formatDistance } from "date-fns";

  export let answer;
</script>

<li>
  <article
    class="uk-comment uk-comment-primary uk-visible-toggle"
    tabindex="-1"
  >
    <header class="uk-comment-header uk-position-relative">
      <div class="uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
          <img
            class="uk-comment-avatar"
            src={`https://eu.ui-avatars.com/api/?name=${answer.person.fullName}`}
            width="80"
            height="80"
            alt=""
          />
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
        </div>
      </div>
    </header>
    <div class="uk-comment-body">
      <p>
        {answer.answer}
      </p>
    </div>
  </article>
</li>
