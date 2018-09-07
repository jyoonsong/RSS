import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import Bar from 'components/Bar';
import Menu from 'components/Menu';
import RestaurantList from 'containers/RestaurantList';

const initialRestaurants = [
    {
        "ID": 1,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "보트르메종",
        "Description": "",
        "Address": "",
        "Kind": "",
        "Thumbnail": "",
        "Ratings": [
            {
                "ID": 1,
                "CreatedAt": "2018-09-05T13:31:39Z",
                "UpdatedAt": "2018-09-05T13:31:39Z",
                "DeletedAt": null,
                "Stars": 4,
                "UserID": 2,
                "RestaurantID": 1
            }
        ]
    }
];

const serverAPI = axios.create({
    baseURL: 'https://api.xn--0z2bs25a.com/api/',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('isLogged')
    }
});

class HomePage extends Component {

    componentWillMount() {
        if (jwt.decode(localStorage.getItem('isLogged'))) {
            this.setState({
                logged: true
            });
            this.restaurantAPI();
            this.tagAPI();
        }
    }

    state = {
        restaurants: initialRestaurants,
        user: parseInt(localStorage.getItem('currentUser'), 10),
        logged: false
    }

    restaurantAPI = () => {
        serverAPI.get('restaurants')
        .then(res => {
            console.log(res);
            this.setState({
                restaurants: res.data
            });
        })
        .catch(error => {
            this.handleError(error);
        })
    }

    tagAPI = () => {
        serverAPI.get('tags')
        .then(res => {
            console.log(res);
        })
    }

    updateStars = (id, newStars) => {
        serverAPI.post('ratings', {
            stars: newStars,
            restaurantId: id
        }).then(res => {
            console.log(res);
        })
        .catch(error => {
            this.handleError(error);
        })
    }

    // updateTags = () => {
    //     serverAPI.post('tags', {
    //         tags: tags,
    //         restaurantId: id
    //     }).then(res => {

    //     })
    // }

    handleError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        }
        console.log(error.config);
    }

    render() {
        const { restaurants, user, logged } = this.state;
        const { updateStars } = this;

        return (
            <div>
                {
                    !logged && <Redirect to="/login" />
                }
                <Bar/>
                <Menu/>
                <Switch>
                    <Route exact path="(/|/visited|/unvisited)/" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}
                                        currentUser={user}
                                        updateStars={updateStars}/>
                    }/>
                </Switch>
            </div>
        );
    }
};

export default HomePage;