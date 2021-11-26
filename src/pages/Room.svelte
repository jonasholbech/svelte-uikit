<script>
  import { navigate } from "svelte-routing";
  import { formatDistance } from "date-fns";
  import { markdown } from "../utils/render";
  import { onMount, onDestroy } from "svelte";
  import { isLoggedIn, identityChecksDone, user } from "../stores/user";
  import { getRoomData, addAnswer, addQuestion } from "../utils/crud";
  import Answer from "../components/Answer.svelte";
  import Avatar from "../components/Avatar.svelte";
  import AnswerForm from "../components/AnswerForm.svelte";
  import QuestionForm from "../components/QuestionForm.svelte";
  export let slug;

  let roomData = null;
  $: $identityChecksDone && !$isLoggedIn && redirect(); //TODO: move to external helper
  $: $identityChecksDone && $isLoggedIn && setup();
  function redirect() {
    console.log("redirecting");
    navigate("/");
  }
  function setup() {
    getData();
  }
  let interval = null;
  onMount(() => {
    //interval = setInterval(getData, 15000);
  });
  onDestroy(() => {
    //clearInterval(interval);
    interval = null;
  });
  async function getData() {
    //TODO: order by in GQL query
    const data = await getRoomData($user, slug);
    roomData = data.room;
    console.log(roomData);
  }
  async function addAnswerSubmit(answer, questionID) {
    console.log(answer);
    const nextAnswer = await addAnswer($user, answer, questionID);
    getData();
    //TODO: merge state instead of fetching again

    /*console.log(nextAnswer.createAnswer);
    const tempRoom = { ...roomData };
    const tempAnswers = tempRoom.question.answer.concat(
      nextAnswer.createAnswer
    );
    tempRoom.answers = tempAnswers;
    roomData = tempRoom;*/
  }
  //TODO: question component
  async function addQuestionSubmit(question, details) {
    const nextQuestion = await addQuestion(
      $user,
      question,
      details,
      roomData.id
    );
    const copy = { ...roomData };
    copy.question = roomData.question.concat(nextQuestion.createQuestion);
    roomData = copy;
    UIkit.offcanvas(document.querySelector("#offcanvas-reveal")).hide();
    setTimeout(() => {
      window.location.href = `#question_${nextQuestion.createQuestion.id}`;
    }, 500);

    //getData();
    //TODO: merge state instead of fetching again
  }
</script>

{#if roomData}
  <h2>{roomData.name}</h2>
  <QuestionForm {addQuestionSubmit} />
  <ul class="uk-comment-list">
    {#each roomData.question as question (question.id)}
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
            <div
              class="uk-position-top-right uk-position-small uk-hidden-hover"
            >
              <a class="uk-link-muted" href="#/">Reply</a>
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
            <Answer {answer} />
          {/each}
          <li><AnswerForm {addAnswerSubmit} questionID={question.id} /></li>
        </ul>
        <!-- comments end-->
      </li>
    {/each}
  </ul>
{/if}
