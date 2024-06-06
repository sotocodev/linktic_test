<script>
  export let text;
  export let onClick = null;
  export let customClass = "";
  export let type = "buttom";

</script>

<button type={type} on:click={onClick} class={`bg-slate-400 px-6 py-2 rounded-md text-cyan-100 hover:bg-slate-300 transition ${customClass}`}
  >{text}</button
>
