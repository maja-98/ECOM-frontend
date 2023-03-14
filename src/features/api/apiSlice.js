import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../auth/authSlice'
const env = (process.env.REACT_APP_ENVIRONMENT)
const baseUrl = env==='PROD' ? 'https://dubai-pardha-palace.onrender.com/api': "http://localhost:3500/api"

const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        

        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired. "
            }
            return refreshResult
        }
    }

    return result
}
export const apiSlice  = createApi({
    reducerPath:"api",
    baseQuery:baseQueryWithReauth,
    endpoints: builder => ({})
})