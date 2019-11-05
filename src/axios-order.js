import Axios from 'axios';

const instance = Axios.create({
    baseURL : "https://react-burger-app-ab541.firebaseio.com/"
})

export default instance;