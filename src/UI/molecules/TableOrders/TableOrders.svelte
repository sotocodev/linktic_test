<script>
  import { onMount } from "svelte";
  import FetchData from "../../../helpers/FetchData";
  import {
    VITE_API_KEY,
    VITE_API_AUTHORIZATION,
  } from "../../../utils/EnvProvider";

  let dataApiOrdersProduct = [];

  const getOrdersProducts = async () => {
    const responseClients = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Client?select=*",
      {
        headers: {
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
        },
      }
    );

    const responseOrderProducts = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Order_Product?select=*",
      {
        headers: {
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
        },
      }
    );

    const responseOrders = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Order?select=*",
      {
        headers: {
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
        },
      }
    );

    const responseProducts = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Product?select=*",
      {
        headers: {
          apikey: VITE_API_KEY,
          Authorization: VITE_API_AUTHORIZATION,
        },
      }
    );

    dataApiOrdersProduct = responseOrderProducts.map((orderProduct) => {
      const order = responseOrders.find(
        (order) => order.id === orderProduct.id_order
      );
      const product = responseProducts.find(
        (product) => product.id === orderProduct.id_product
      );
      const client = responseClients.find(
        (client) => client.id === order.id_client
      );

      return {
        order_address: order.address,
        order_id: order.id,
        client_name: client.name,
        client_lastname: client.lastname,
        product_name: product.name,
        product_price: product.price,
        order_quatity: orderProduct.quatity,
      };
    });
  };
  onMount(() => {
    getOrdersProducts();
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
        >Direccion</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Cliente</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Producto</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Costo</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Cantidad</th
      >
    </tr>
  </thead>
  <tbody>
    {#each dataApiOrdersProduct as data}
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{data.order_id}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{data.order_address}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{data.client_name} {data.client_lastname}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{data.product_name}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{data.product_price}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{data.order_quatity}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
