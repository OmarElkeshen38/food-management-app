import axios from "axios";

export const baseUrl = 'https://upskilling-egypt.com:3006/api/v1';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
})


export const USER_URLS = {

    login: `/Users/Login`,
    register: `/Users/Register`,
    forget_pass: `/Users/Reset/Request`,
    reset_pass: `/Users/Reset`,
    get_user: (id) => `/Users/${id}`,
    
}

export const RECIPES_URLS = {


}