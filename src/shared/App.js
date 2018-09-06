import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from 'pages';

class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" render={LoginPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </div>
        );
    }
}

export default App;