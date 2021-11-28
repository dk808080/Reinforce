import { getToken } from "./auth";
import axios from "axios";

function setAuthToken() {
    const tokenStr = getToken();
    if (tokenStr) {
        axios.defaults.headers.common['Authorization'] = tokenStr;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;