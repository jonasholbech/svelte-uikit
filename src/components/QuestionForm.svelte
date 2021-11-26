<script>
  let details = "";
  let question = "";
  export let addQuestionSubmit;

  let firstField;
</script>

<button
  class="uk-button uk-button-default uk-margin-small-right"
  type="button"
  uk-toggle="target: #offcanvas-reveal"
  on:click={async () => {
    setTimeout(() => {
      firstField.focus();
    }, 100);
  }}>Add your question</button
>
<div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true">
  <div class="uk-offcanvas-bar">
    <button class="uk-offcanvas-close" type="button" uk-close />

    <form
      on:submit|preventDefault={() => {
        addQuestionSubmit(question, details);
        question = "";
        details = "";
      }}
    >
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Ask a question</legend>
        <div class="uk-margin">
          <input
            class="uk-input"
            type="text"
            placeholder="Input"
            bind:value={question}
            bind:this={firstField}
            required
          />
        </div>

        <div class="uk-margin">
          <textarea
            class="uk-textarea"
            rows="5"
            placeholder="Textarea"
            name="question"
            bind:value={details}
          />
        </div>
        <button class="uk-button uk-button-primary uk-align-right">Ask</button>
      </fieldset>
    </form>
  </div>
</div>

<hr class="uk-divider-icon" />
