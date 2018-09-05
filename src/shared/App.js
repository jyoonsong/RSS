import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from 'pages';

class App extends Component {
    componentDidMount() {
        const serverAPI = "http://localhost:1323/";
        localStorage.setItem('serverAPI', serverAPI);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default App;