import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

const http: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
    },
} as CreateAxiosDefaults);

export default http;