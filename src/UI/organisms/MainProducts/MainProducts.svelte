<script>
  import TableProducts from "../../molecules/TableProducts/TableProducts.svelte";
  import TableFIlterProducts from "../../molecules/TableFIlterProducts/TableFIlterProducts.svelte";
</script>

<div class="flex w-full justify-center items-center gap-10">
  <div class="flex flex-col gap-10 w-full px-10">
    <TableFIlterProducts />
    <TableProducts />
  </div>
</div>
