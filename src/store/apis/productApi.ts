import { api } from '.'

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products'
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body
      })
    })
  })
})

export const { useGetProductsQuery, useGetProductQuery, useCreateProductMutation } = productApi