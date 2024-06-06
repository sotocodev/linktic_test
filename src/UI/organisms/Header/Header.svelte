<script>
  import List from "../../atoms/List/List.svelte";
  import Logo from "../../atoms/Logo/Logo.svelte";
  import { ITEMS } from "../../../utils/HomePage"
</script>

<header class="flex w-full justify-between px-6 py-4 items-center">
  <Logo customClass="w-14" />
  <nav class="w-full">
    <List
      customClassList="flex w-full gap-10 flex-row justify-end gap-"
      items={ITEMS}
    />
  </nav>
</header>
