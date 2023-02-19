import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const env = (process.env.REACT_APP_ENVIRONMENT)
const baseUrl = env==='PROD' ? 'https://dubai-pardha-palace.onrender.com/api': "http://localhost:3500/api"
export const apiSlice  = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: builder => ({})
})

