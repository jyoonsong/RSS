import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from 'pages';

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.xn--0z2bs25a.com/api/',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('isLogged')
    }
});

class App extends Component {
    componentDidMount() {
        const serverAPI = "https://api.xn--0z2bs25a.com/";
        localStorage.setItem('serverAPI', serverAPI);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" render={props => 
                        <LoginPage {...props}
                                    api={api}/>
                    }/>
                    <Route path="/" render={props => 
                        <HomePage   {...props}
                                    api={api}/>
                    }/>
                </Switch>
            </div>
        );
    }
}

export default App;