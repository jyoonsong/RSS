import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

import Login from 'components/Login';

const LoginPage = ({history}) => {

    const serverAPI = axios.create({
        baseURL: 'https://api.xn--0z2bs25a.com/'
    });

    const login = (token) => {
        // current user info in header
        localStorage.setItem('isLogged', token);
        localStorage.setItem('currentUser', jwt.decode(token).id);

        // redirect
        history.push("/");
    }
    
    const loginAPI = (provider, accessToken, id, name, email) => {
        serverAPI.post('login', {
            provider,
            accessToken
        }).then(res => {
            if (res.data.isUser)
                login(res.data.token);
            else
                singupAPI(provider, id, name, email);
        });
    }
    
    const singupAPI = (provider, id, name, email) => {
        serverAPI.post('users', {
            name,
            email,
            provider,
            id
        }).then(res => {
            console.log(res);
            if (res.data.isUser)
                login(res.data.token);
        })
    }
    
    const responseFacebook = (response) => {
        loginAPI("facebook", response.accessToken, response.id, response.name, response.email);
    }
    const responseGoogle = (response) => {
        console.log(response);
        loginAPI("google", response.tokenId, response.googleId, response.profileObj.name, response.profileObj.email);
    }
    const responseError = (response) => {
        console.log("ERR");
        console.log(response);
    }

    return (
        <div>
            {
                (jwt.decode(localStorage.getItem('isLogged') != null)) && <Redirect to="/" />
            }
            <Login  responseFacebook={responseFacebook}
                    responseGoogle={responseGoogle}
                    responseError={responseError} />
        </div>
    );
};

export default LoginPage;