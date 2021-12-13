<script>
  import { navigate } from "svelte-routing";
  import { onMount, onDestroy } from "svelte";
  import { isLoggedIn, identityChecksDone, user } from "../stores/user";
  import {
    getRoomData,
    addAnswer,
    addQuestion,
    deleteAnswer as deleteAnswerRequest,
    deleteQuestion as deleteQuestionRequest,
  } from "../utils/crud";

  import Question from "../components/Question.svelte";
  import QuestionForm from "../components/QuestionForm.svelte";
  export let slug;

  let roomData = null;
  $: $identityChecksDone && !$isLoggedIn && redirect(); //TODO: move to external helper
  $: $identityChecksDone && $isLoggedIn && getData();
  function redirect() {
    console.log("redirecting");
    navigate("/");
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
  }
  async function addAnswerSubmit(answer, questionID) {
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
  async function deleteAnswer(answerID) {
    const deleted = await deleteAnswerRequest($user, answerID);
    const id = deleted.deleteAnswer.id; //TODO: hvis jeg fjerner GQL navnet slipper jeg så ikke får .deleteAnswer?
    getData();
    //TODO: merge state instead of fetching again, skal nok bruge questionID
  }
  async function deleteQuestion(questionID) {
    const deleted = await deleteQuestionRequest($user, questionID);
    getData();
    //TODO: merge state instead of fetching again
  }
</script>

{#if roomData}
  <h2>{roomData.name}</h2>
  <QuestionForm {addQuestionSubmit} />
  <ul class="uk-comment-list">
    {#each roomData.question as question (question.id)}
      <Question {deleteQuestion} {deleteAnswer} {addAnswerSubmit} {question} />
    {/each}
  </ul>
{/if}
