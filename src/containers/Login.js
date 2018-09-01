import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const responseFacebook = (response) => {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
    } 
    else {
        // The person is not logged into this app or we are unable to tell. 
    }
}

const Login = () => {
    return (
        <div className="container text-center">
            <img src={require("img/matcha.png")} alt="logo"/>
            <p>네 입 맛 에 <span class="white">맛 챠</span> 줄 게</p>
            <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name, email, picture"
                textButton=" 페이스북으로 로그인"
                icon={<FontAwesomeIcon icon={faFacebook} />}
                callback={responseFacebook} />
        </div>
    );
};

export default Login;