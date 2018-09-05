import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, LoginContainer } from 'pages';

class App extends Component {
    componentDidMount() {
        const serverAPI = "https://api.xn--0z2bs25a.com/";
        localStorage.setItem('serverAPI', serverAPI);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={LoginContainer}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default App;