<script>
  import { onMount } from "svelte";
  import { DataProducts } from "../../../context/Store";
  import FetchData from "../../../helpers/FetchData";
  import {
    VITE_API_AUTHORIZATION,
    VITE_API_KEY,
  } from "../../../utils/EnvProvider";
  import Buttom from "../../atoms/Buttom/Buttom.svelte";

  export let callback;
  let dataApiClients = [];
  let dataForm = {
    id_product: "",
    id_client: "",
    quatity: "",
    address: "",

  };
  const sendData = async () => {
    const responseOrder = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
          Prefer: "return=representation"
        },
        body: {
          id_client: dataForm.id_client,
          address: dataForm.address,
        },
      }
    );
    const idNewOrder = responseOrder[0].id;

    console.log("responseOrder", responseOrder);


    const responseOrderProduct = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Order_Product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
          Prefer: "return=representation"
        },
        body: {
          id_product: dataForm.id_product,
          id_order: idNewOrder,
          quatity: dataForm.quatity,
        },
      }
    );
    callback(false);
    console.log(responseOrderProduct);


  };
  const getClients = async () => {
    const responseClients = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Client?select=*",
      {
        headers: {
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
        }
      }
    );
    dataApiClients = responseClients;
  };
  onMount(() => {
    getClients()
  })
</script>

<div
  class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
>
  <div
    class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white"
  >
    <div class="p-8 rounded border border-gray-200">
      <h1 class="font-medium text-3xl">Nuevo Pedido</h1>
      <form on:submit|preventDefault={sendData}>
        <div class="mt-8 space-y-6">
          <div>
            <label
              for="Address"
              class="text-sm text-gray-700 block mb-1 font-medium"
              >Direccion</label
            >
            <input
              required
              type="text"
              id="Address"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="address"
              name="address"
              bind:value={dataForm.address}
            />
          </div>

          <div>
            <label
              for="quatity"
              class="text-sm text-gray-700 block mb-1 font-medium">Cantidad</label
            >
            <input
              required
              type="number"
              id="quatity"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="1"
              name="quatity"
              bind:value={dataForm.quatity}
            />
          </div>
          <div>
            <label
              for="Cliente"
              class="text-sm text-gray-700 block mb-1 font-medium"
              >Cliente</label
            >
            <select
              id="Cliente"
              name="id_client"
              required
              bind:value={dataForm.id_client}
            >
              {#each dataApiClients as client}
                <option value={client.id}>{client.name} {client.lastname}</option>
              {/each}
            </select>
          </div>
          <div>
            <label
              for="Producto"
              class="text-sm text-gray-700 block mb-1 font-medium"
              >Producto</label
            >
            <select
              id="Producto"
              name="id_product"
              required
              bind:value={dataForm.id_product}
            >
              {#each $DataProducts as producto}
                <option value={producto.id}>{producto.name}</option>
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
