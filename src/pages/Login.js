import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const responseFacebook = (response) => {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        let accessToken = response.authResponse.accessToken;
        console.log(accessToken);
    } 
    else {
        // The person is not logged into this app or we are unable to tell. 
    }
}
const responseGoogle = (response) => {
    console.log(response);
}

const Login = () => {
    return (
        <div className="container text-center">
            <img className="title" src={require("img/matcha.png")} alt="logo"/>
            <p className="subtitle">네 입 맛 에 <span className="white">맛 챠</span> 줄 게</p>
            <FacebookLogin
                appId="1087520368071444" // jaeyoon
                autoLoad={true}
                fields="name, email"
                textButton="페이스북으로 로그인"
                xfbml={true}
                cookie={true}
                version="3.1"
                cssClass="button facebook"
                icon={<FontAwesomeIcon icon={faFacebook} />}
                callback={responseFacebook} />
            <GoogleLogin
                clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'} // TODO
                className="button google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            >
                <FontAwesomeIcon icon={faGoogle} />
                <span>구글로 로그인</span>
            </GoogleLogin>
        </div>
    );
};

export default Login;