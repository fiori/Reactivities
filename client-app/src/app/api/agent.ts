import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(2000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T = any> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T = any>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T = any> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T = any> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T = any> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    detail: (id: string) => request.get<Activity>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;