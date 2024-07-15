import axios from "axios";
//----------------------------------------------------------
const projects = axios.create({
    baseURL: 'http://localhost:2024/projects'
});
//----------------------------------------------------------
export default projects;