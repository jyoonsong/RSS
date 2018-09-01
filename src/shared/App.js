import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from 'containers';

class App extends Component {
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