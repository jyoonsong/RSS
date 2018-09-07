import React from 'react';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = ({responseFacebook, responseGoogle, responseError}) => {
    return (
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
                    callback={responseFacebook}
                    onFailure={responseError} />
                <br/>
                <GoogleLogin
                    clientId={'563311872927-e2igmlvdlkcglr51go0ev763rrqifhvd.apps.googleusercontent.com'}
                    className="button google"
                    onSuccess={responseGoogle}
                    onFailure={responseError}
                >
                    <FontAwesomeIcon icon={faGoogle} />
                    <span>구글로 로그인</span>
                </GoogleLogin>

            </div>
        </div>
    );
};

export default Login;