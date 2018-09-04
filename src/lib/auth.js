import axios from 'axios';

const serverAPI = "http://localhost:1323/";

export const socialLogin = ({provider, accessToken}) => axios.post(serverAPI + "login", {
    provider,
    accessToken
});

export const socialRegister = ({provider, id, name, email}) => axios.post(serverAPI + "", {
    name,
    email,
    provider,
    id
});