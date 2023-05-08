import axios from "axios";
// import env  from 'react-dotenv';

const instance=axios.create({
    baseURL:import.meta.env.VITE_API_URL
})
export default instance;