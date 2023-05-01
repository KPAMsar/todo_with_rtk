import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../Config";


export const getProducts = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    addProduct: builder.mutation({
      query: (item) => ({
        url: "products/add",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (item) => ({
        url: `products/${item.id}`,
        method: "PATCH",
        body: item,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAProductQuery,
} = getProducts;