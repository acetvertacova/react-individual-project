import axios from "axios";

const api = axios.create({
    baseURL: "https://681b800b17018fe5057bd095.mockapi.io/movie",
})

export default api;