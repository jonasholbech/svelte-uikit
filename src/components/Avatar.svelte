<script>
  export let name;
  export const size = 60;
  let parts = name.split(" ");
  let first = name[0];
  let second = name[1];
  if (parts.length > 1) {
    second = parts.at(-1)[0];
  }
</script>

<div style={`--size: ${size}px`}>
  <span>{first}{second}</span>
</div>

<style>
  div {
    background: #39f;
    width: var(--size);
    height: var(--size);
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
