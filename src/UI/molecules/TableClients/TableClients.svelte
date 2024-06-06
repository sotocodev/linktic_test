<script>
  import { onMount } from "svelte";
  import FetchData from "../../../helpers/FetchData";
  import {
    VITE_API_KEY,
    VITE_API_AUTHORIZATION,
  } from "../../../utils/EnvProvider";

  let dataApiClients = [];
  const getClientsOrder = async () => {
    const responseClients = await FetchData(
      "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Client?select=*",
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

    dataApiClients = responseClients.map((client) => {
      const ordersCount = responseOrders.filter(
        (order) => order.id_client === client.id
      ).length;
      return { ...client, ordersCount };
    });
  };
  onMount(() => {
    getClientsOrder();
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
        >Name</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Lastname</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >email</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Phone</th
      >
      <th
        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >Orders</th
      >
    </tr>
  </thead>
  <tbody>
    {#each dataApiClients as client}
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{client.id}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{client.name}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{client.lastname}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{client.email}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{client.phone}</td
        >
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >{client.ordersCount}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
