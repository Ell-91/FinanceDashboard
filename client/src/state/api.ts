import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse } from "./types";

// Alows us to make endpoints that we can use to call our backend 
//VITE_BASE_URL is the enviornment variable that we created - the url we call everytime we make an api call 
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions"],
    // API endpoints
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>,void>({
          query: () => "kpi/kpis/",
          providesTags: ["Kpis"],
        }),
    })
})

export const { useGetKpisQuery} = api;