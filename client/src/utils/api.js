import Axios from 'axios';

let instance = Axios.create({
    baseURL: "http://localhost:5000/"
});


export default instance;
