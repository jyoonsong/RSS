import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const serverAPI = localStorage.getItem('serverAPI');

const login = (token) => {
    localStorage.setItem('userId', jwt.decode(token));
}

const loginAPI = (provider, accessToken, id, name, email) => {
    axios.post(serverAPI + 'login', {
        provider,
        accessToken
    }).then(res => {
        console.log(res);
        if (res.isUser)
            login(res.token);
        else
            singupAPI(provider, id, name, email);
    });
}

const singupAPI = (provider, id, name, email) => {
    axios.post(serverAPI + 'users', {
        name,
        email,
        provider,
        id
    }).then(res => {
        console.log(res);
        if (res.isUser)
            login(res.token);
    })
}

const responseFacebook = (response) => {
    console.log(response);
    if (response.email) {
        // Logged into your app and Facebook.
        loginAPI(response.accessToken, "facebook", response.id, response.name, response.email);
    } 
    else {
        // The person is not logged into this app or we are unable to tell. 
    }
}
const responseGoogle = (response) => {
    console.log(response);
    if (!response.error) {
        loginAPI(response.accessToken, "google", response.googleId, response.profileObj.name, response.profileObj.email);
    }
    else {
        // The person is not logged into this app or we are unable to tell. 
    }
}

const Login = () => {
    return (
        <div>
            {
                JSON.parse(localStorage.getItem('isLogged') || false) && <Redirect to="/" />
            }
             <div className="wrapper flex flex-column justify-center" 
             style={{backgroundImage: "url('" + require('img/bg-pattern.png') + "')"}}>
                <div className="container text-center">
                    <img className="title" src={require("img/matcha.png")} alt="logo"/>
                    <p className="subtitle">네 입 맛 에 <span className="white">맛 챠</span> 줄 게</p>

                    <FacebookLogin
                        appId="1087520368071444" // jaeyoon
                        fields="name, email"
                        textButton="페이스북으로 로그인"
                        xfbml={true}
                        cookie={true}
                        version="3.1"
                        cssClass="button facebook"
                        icon={<FontAwesomeIcon icon={faFacebookF} />}
                        callback={responseFacebook} />
                    <br/>
                    <GoogleLogin
                        clientId={'563311872927-e2igmlvdlkcglr51go0ev763rrqifhvd.apps.googleusercontent.com'}
                        className="button google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    >
                        <FontAwesomeIcon icon={faGoogle} />
                        <span>구글로 로그인</span>
                    </GoogleLogin>

                </div>
            </div>
        </div>
    );
};

export default Login;