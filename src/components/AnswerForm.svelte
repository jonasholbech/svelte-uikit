<script>
  let value = "";
  export let addAnswerSubmit;
  export let questionID;
</script>

<form
  on:submit|preventDefault={() => {
    addAnswerSubmit(value, questionID);
    value = "";
  }}
>
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Provide an answer</legend>

    <div class="uk-margin">
      <textarea
        class="uk-textarea"
        rows="5"
        placeholder="Your answer"
        name="answer"
        bind:value
        required
      />
    </div>

    <button class="uk-button uk-button-primary uk-align-right">Send</button>
  </fieldset>
</form>
