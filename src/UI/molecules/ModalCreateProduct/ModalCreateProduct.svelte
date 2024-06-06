<script>
  import { onMount } from "svelte";
  import { DataCategories } from "../../../context/Store";
  import FetchData from "../../../helpers/FetchData";
  import {
    VITE_API_AUTHORIZATION,
    VITE_API_KEY,
  } from "../../../utils/EnvProvider";
  import Buttom from "../../atoms/Buttom/Buttom.svelte";

  export let callback;

  let dataApiProvider = [];
  let dataForm = {
    id_category: "",
    price: "",
    name: "",
    id_provider: "",
    quatity: "",

  };
  const sendData = async () => {
    const responseProduct = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
          Prefer: "return=representation",
        },
        body: {
          id_category: dataForm.id_category,
          price: dataForm.price,
          name: dataForm.name,
        },
      }
    );
    console.log(responseProduct);

    const idNewProduct = responseProduct[0].id;

    const responseProductProvider = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Product_Provider",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
          Prefer: "return=representation",
        },
        body: {
          id_product: idNewProduct,
          id_provider: dataForm.id_provider,
          quatity: dataForm.quatity,
        },
      }
    );
    callback(false);
    console.log(responseProductProvider);

  };
  const getProvider = async () => {
    const responseProvider = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Provider?select=*",
      {
        headers: {
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
        },
      }
    );
    console.log("responseProvider", responseProvider);
    dataApiProvider = responseProvider;
  };
  onMount(() => {
    getProvider();
  });
</script>

<div
  class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
>
  <div
    class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white"
  >
    <div class="p-8 rounded border border-gray-200">
      <h1 class="font-medium text-3xl">Agregar Producto</h1>
      <form on:submit|preventDefault={sendData}>
        <div class="mt-8 space-y-6">
          <div>
            <label
              for="name"
              class="text-sm text-gray-700 block mb-1 font-medium"
              >Nombre del producto</label
            >
            <input
              required
              type="text"
              id="name"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your name"
              name="name"
              bind:value={dataForm.name}
            />
          </div>

          <div>
            <label
              for="price"
              class="text-sm text-gray-700 block mb-1 font-medium">Precio</label
            >
            <input
              required
              type="number"
              id="price"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="$$$"
              name="price"
              bind:value={dataForm.price}
            />
          </div>
          <div>
            <label
              for="cantidad"
              class="text-sm text-gray-700 block mb-1 font-medium">Cantidad</label
            >
            <input
              required
              type="number"
              id="cantidad"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="1"
              name="quatity"
              bind:value={dataForm.quatity}
            />
          </div>
          <div>
            <label
              for="Categoria"
              class="text-sm text-gray-700 block mb-1 font-medium"
              >Categoria</label
            >
            <select
              id="Categoria"
              name="id_category"
              required
              bind:value={dataForm.id_category}
            >
              {#each $DataCategories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <label
              for="Provider"
              class="text-sm text-gray-700 block mb-1 font-medium"
              >Proveedor</label
            >
            <select
              id="Provider"
              name="id_provider"
              required
              bind:value={dataForm.id_provider}
            >
              {#each dataApiProvider as provider}
                <option value={provider.id}>{provider.company_name}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="space-x-4 mt-8">
          <Buttom
            customClass="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            type="submit"
            text="Crear"
          />

          <Buttom
            customClass="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            text="Cerrar"
            onClick={callback}
          />
        </div>
      </form>
    </div>
  </div>
</div>
