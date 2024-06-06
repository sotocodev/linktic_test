<script>
  import {
    DataProducts,
    DataCategories,
    DataProductsInit,
  } from "../../../context/Store";
  import Buttom from "../../atoms/Buttom/Buttom.svelte";
  import ModalCreatePedido from "../ModalCreatePedido/ModalCreatePedido.svelte";
  import ModalCreateProduct from "../ModalCreateProduct/ModalCreateProduct.svelte";

  let selectedCategory = "All";
  let showModal = false;
  let showModalPedido = false;

  const filterProducts = () => {
    if (selectedCategory === "All") {
      DataProducts.set($DataProductsInit);
    } else {
      let filter = $DataProductsInit.filter(
        (product) => product.categoryName === selectedCategory
      );
      console.log("selectedCategory", selectedCategory);
      console.log("f", filter);
      DataProducts.set(filter);
    }
  };
  const handleCategoryChange = (event) => {
    selectedCategory = event.target.value;
    filterProducts();
  };
  const handleModalOpen = (boolean) => {
    showModal = boolean;
  };
  const handleModalOpenPeido = (boolean) => {
    showModalPedido = boolean;
  };
</script>

<div class="flex gap-5 justify-center items-center">
  <label for="category">Filtrar por categoria:</label>
  <select
    id="category"
    bind:value={selectedCategory}
    on:change={handleCategoryChange}
  >
    <option value="All">All</option>
    {#each $DataCategories as category}
      <option value={category.name}>{category.name}</option>
    {/each}
  </select>
  <Buttom onClick={() => handleModalOpen(true)} text="Agregar producto" />
  <Buttom onClick={() => handleModalOpenPeido(true)} text="Crear pedido" />

  {#if showModal}
    <ModalCreateProduct callback={() => handleModalOpen(false)} />
  {/if}
  {#if showModalPedido}
    <ModalCreatePedido callback={() => handleModalOpenPeido(false)} />
  {/if}
</div>
