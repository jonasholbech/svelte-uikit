<script>
  export let name;
  export const size = 60; //TODO: implement sizes indiv
  let parts = name.split(" ");
  let first = name[0];
  let second = name[1];
  if (parts.length > 1) {
    second = parts.at(-1)[0];
  }
</script>

<div>
  <span>{first}{second}</span>
</div>

<style>
  div {
    background: #39f;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
  }
  span {
    font-size: 200%;
    color: #fff;
  }
</style>
