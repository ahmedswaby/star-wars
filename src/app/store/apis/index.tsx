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
    getPeople: builder.query<SPeople, {page: number; searchTerm: string | ''}>({
      query: ({page , searchTerm}) => ({
        url: `/${apiRoot}/people?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`,
        method: "GET",
      }),
    }),
    getPlantes: builder.query<Planets,  {page: number; searchTerm: string | ''}>({
      query: ({page , searchTerm})  => ({
        url: `/${apiRoot}/planets?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`,
        method: "GET",
      }),
    }),
    getFilms: builder.query<SFilms, {page: number; searchTerm: string | ''}>({
      query: ({page , searchTerm})  => ({
        url: `/${apiRoot}/films?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`,
        method: "GET",
      }),
    }),
    getSpecies: builder.query<Sspecies, {page: number; searchTerm: string | ''}>({
      query:({page , searchTerm}) => ({
        url: `/${apiRoot}/species?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`,
        method: "GET",
      }),
    }),
    getVehicles: builder.query<Svehicles, {page: number; searchTerm: string | ''}>({
      query: ({page , searchTerm})  => ({
        url: `/${apiRoot}/vehicles?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`,
        method: "GET",
      }),
    }),
    getStarships: builder.query<Sstarships, {page: number; searchTerm: string | ''}>({
      query: ({page , searchTerm})  => ({
        url: `/${apiRoot}/starships?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetApisQuery , useGetPeopleQuery , useGetPlantesQuery , useGetFilmsQuery , useGetSpeciesQuery , useGetVehiclesQuery , useGetStarshipsQuery} = starwarsAPI;
