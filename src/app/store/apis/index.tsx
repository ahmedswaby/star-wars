import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../config/index";
import { SPeople , Planets , SFilms , Sspecies , Svehicles , Sstarships} from "@/interfaces/DTO";


const apiRoot = 'api'

export const starwarsAPI = createApi({
  reducerPath: "starwars",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["starwars"],
  endpoints: builder => ({
    getApis: builder.query<number, void>({
      query: () => ({
        url: `/${apiRoot}`,
        method: "GET",
      }),
    }),
    getPeople: builder.query<SPeople, number>({
      query: (page) => ({
        url: `/${apiRoot}/people?page=${page}`,
        method: "GET",
      }),
    }),
    getPlantes: builder.query<Planets, number>({
      query: (page) => ({
        url: `/${apiRoot}/planets?page=${page}`,
        method: "GET",
      }),
    }),
    getFilms: builder.query<SFilms, number>({
      query: (page) => ({
        url: `/${apiRoot}/films?page=${page}`,
        method: "GET",
      }),
    }),
    getSpecies: builder.query<Sspecies, number>({
      query: (page) => ({
        url: `/${apiRoot}/species?page=${page}`,
        method: "GET",
      }),
    }),
    getVehicles: builder.query<Svehicles, number>({
      query: (page) => ({
        url: `/${apiRoot}/vehicles?page=${page}`,
        method: "GET",
      }),
    }),
    getStarships: builder.query<Sstarships, number>({
      query: (page) => ({
        url: `/${apiRoot}/starships?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetApisQuery , useGetPeopleQuery , useGetPlantesQuery , useGetFilmsQuery , useGetSpeciesQuery , useGetVehiclesQuery , useGetStarshipsQuery} = starwarsAPI;
