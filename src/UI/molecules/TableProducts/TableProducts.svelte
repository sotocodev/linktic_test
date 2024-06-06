<script>
  import { onMount } from "svelte";
  import { DataProducts, FecthProducts } from "../../../context/Store";

  onMount(() => {
    FecthProducts();
  });
</script>

<table class="min-w-full leading-normal">
  <thead>
    <tr>
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >ID</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Creation Date</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Name</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Price</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Category</th
      >
    </tr>
  </thead>
  <tbody>
    {#each $DataProducts as product}
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{product.id}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{product.date}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{product.name}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{product.price}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{product.categoryName}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
