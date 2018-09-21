import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

import Login from 'components/Login';

const LoginPage = ({history, api}) => {

    const login = (token) => {
        // current user info in header
        localStorage.setItem('isLogged', token);
        localStorage.setItem('currentUser', jwt.decode(token).id);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isLogged');

        // redirect
        history.push("/");
    }
    
    const loginAPI = (provider, accessToken, id, name, email) => {
        const serverAPI = localStorage.getItem('serverAPI');

        axios.post(serverAPI + 'login', {
            provider,
            accessToken
        })
        .then(res => {
            if (res.data.isUser)
                login(res.data.token);
            else
                singupAPI(provider, id, name, email);
        })
        .catch(error => {
            this.handleError(error);
        });
    }
    
    const singupAPI = (provider, id, name, email) => {
        const serverAPI = localStorage.getItem('serverAPI');
    
        axios.post(serverAPI + 'users', {
            name,
            email,
            provider,
            id
        })
        .then(res => {
            if (res.data.isUser)
                login(res.data.token);
        })
        .catch(error => {
            handleError(error);
        });
    }

    const handleError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
            console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
    
    const responseFacebook = (response) => {
        console.log(response);
        loginAPI("facebook", response.accessToken, response.id, response.name, response.email);
    }
    const responseGoogle = (response) => {
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