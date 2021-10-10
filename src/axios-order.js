import axios from "axios";

const instance =  axios.create({
    baseURL : "https://react-my-burger-43dc9-default-rtdb.firebaseio.com/"
})

export default instance;

