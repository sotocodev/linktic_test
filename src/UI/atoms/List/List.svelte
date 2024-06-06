<script>
  export let customClassList;
  export let customClassItem = "";
  export let items;
</script>

<ul class={`${customClassList}`}>
  {#each items as item, i}
    <li key={i} class={`text-lg font-mono ${customClassItem}`}>
      <a href="{item.path}">{item.text}</a>
    </li>
  {/each}
</ul>