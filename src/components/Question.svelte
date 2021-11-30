<script>
  import { formatDistance } from "date-fns";
  import { markdown } from "../utils/render";
  import Answer from "../components/Answer.svelte";
  import Avatar from "../components/Avatar.svelte";
  import AnswerForm from "../components/AnswerForm.svelte";

  export let question;
  export let addAnswerSubmit;
  export let deleteAnswer;
  export let deleteQuestion;
  function focusForm() {
    const ta = document.querySelector(`#form_${question.id} textarea`);
    //without STO it gets focus and looses it imediately, maybe i have to set it through props/ref
    setTimeout(() => {
      ta.focus();
    }, 100);
  }
</script>

<li id={`question_${question.id}`}>
  <article class="uk-comment uk-visible-toggle" tabindex="-1">
    <header class="uk-comment-header uk-position-relative">
      <div class="uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
          <Avatar name={question.person.fullName} />
        </div>
        <div class="uk-width-expand">
          <h4 class="uk-comment-title uk-margin-remove">
            {question.person.fullName}
          </h4>
          <p class="uk-comment-meta uk-margin-remove-top">
            {formatDistance(new Date(question.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <div class="uk-position-top-right uk-position-small">
        <ul class="uk-iconnav">
          <li>
            <a href={`#form_${question.id}`} on:click={focusForm}
              ><span uk-icon="reply" /></a
            >
          </li>
          <li>
            <button
              uk-icon="icon: trash"
              on:click={() => deleteQuestion(question.id)}
            />
          </li>
        </ul>
      </div>
    </header>
    <h4 class="uk-comment-title">{question.question}</h4>
    <div class="uk-comment-body">
      <p>
        {@html markdown(question.details)}
      </p>
    </div>
  </article>
  <!-- comments here -->
  <ul>
    {#each question.answer as answer (answer.id)}
      <Answer {deleteAnswer} {answer} />
    {/each}
    <li id={`form_${question.id}`}>
      <AnswerForm {addAnswerSubmit} questionID={question.id} />
    </li>
  </ul>
  <!-- comments end-->
</li>
