import axios, { AxiosRequestConfig, Method } from 'axios'
import { useRouter } from 'next/navigation'

interface AuthFetchProps {
    endpoint: string
    redirectRoute?: string
    formData?: any
    options?: AxiosRequestConfig<any>
    method?: Method
}

export function useFetchHook() {
    const router = useRouter();

    const authRouter = async ({
        endpoint,
        formData,
        redirectRoute,
        options,
        method = 'post' // default method is post
    }: AuthFetchProps) => {
        try {
            const { data } = await axios({
                url: `https://deploytest-tc4w.onrender.com/api/${endpoint}`,
                method,
                data: formData,
                ...options
            })
            console.log(data);

            if (redirectRoute) {
                router.push(redirectRoute)
                router.refresh();
            }
            return data
        } catch (error: any) {
            console.log("error");
        }
    }

    return authRouter
}