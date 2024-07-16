import axios from "axios";
//----------------------------------------------------------
const usersFetch = axios.create({
    baseURL: 'http://localhost:2024/'
});
//----------------------------------------------------------
export default usersFetch;