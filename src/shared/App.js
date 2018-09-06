import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from 'pages';

class App extends Component {
    componentDidMount() {
        const serverAPI = "https://api.xn--0z2bs25a.com/";
        localStorage.setItem('serverAPI', serverAPI);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </div>
        );
    }
}

export default App;