import { writable } from "svelte/store";
import FormatDate from "../helpers/FormatDate";
import FetchData from "../helpers/FetchData";
import { VITE_API_AUTHORIZATION, VITE_API_KEY } from "../utils/EnvProvider";

export const DataProductsInit = writable([]);
export const DataProducts = writable([]);

export const DataCategories = writable([]);

export const FecthProducts = async () => {
  const productsResponse = await FetchData(
    "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Product?select=*",
    {
      headers: {
        apikey: VITE_API_KEY,
        Authorization: VITE_API_AUTHORIZATION,
      },
    }
  );
  const categoriesResponse = await FetchData(
    "https://ebfefrxkcucfxearaawc.supabase.co/rest/v1/Category?select=*",
    {
      headers: {
        apikey: VITE_API_KEY,
        Authorization: VITE_API_AUTHORIZATION,
      },
    }
  );
  const dataApiProducts = productsResponse.map((product) => {
    const category = categoriesResponse.find(
      (cat) => cat.id === product.id_category
    );
    return {
      ...product,
      categoryName: category ? category.name : "Unknown",
      date: FormatDate(product.created_at),
    };
  });
  DataProducts.set(dataApiProducts);
  DataProductsInit.set(dataApiProducts);
  DataCategories.set(categoriesResponse)
};
