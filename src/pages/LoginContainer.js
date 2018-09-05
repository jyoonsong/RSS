import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

import Login from 'components/Login';

const LoginContainer = ({history}) => {

    const login = (token) => {
        localStorage.setItem('isLogged', token);
        localStorage.setItem('userName', jwt.decode(token).name);
        axios.defaults.headers.common = {'Authorization': "bearer " + token};
        history.push("/");
    }
    
    const loginAPI = (provider, accessToken, id, name, email) => {
        const serverAPI = localStorage.getItem('serverAPI');
    
        axios.post(serverAPI + 'login', {
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
        const serverAPI = localStorage.getItem('serverAPI');
    
        axios.post(serverAPI + 'users', {
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
                console.log(jwt.decode(localStorage.getItem('isLogged')) != null)
            }
            {
                (jwt.decode(localStorage.getItem('isLogged') != null)) && <Redirect to="/" />
            }
            <Login  responseFacebook={responseFacebook}
                    responseGoogle={responseGoogle}
                    responseError={responseError} />
        </div>
    );
};

export default LoginContainer;