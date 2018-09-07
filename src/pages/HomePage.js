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

const initialTags = [];

const serverAPI = axios.create({
    baseURL: 'https://api.xn--0z2bs25a.com/api/',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('isLogged')
    }
});

class HomePage extends Component {

    componentWillMount() {
        console.log("mount");

        if (jwt.decode(localStorage.getItem('isLogged'))) {
            serverAPI.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isLogged');
            this.setState({
                logged: true,
            });
            this.restaurantAPI();
            this.tagAPI();
        }

        console.log(serverAPI.defaults.headers);
    }

    state = {
        restaurants: initialRestaurants,
        tags: initialTags,
        user: parseInt(localStorage.getItem('currentUser'), 10),
        logged: false
    }

    restaurantAPI = () => {
        serverAPI.get('restaurants', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('isLogged')
            }
        })
        .then(res => {
            this.setState({
                restaurants: res.data
            });
        })
        .catch(error => {
            this.handleError(error);
        })
    }

    tagAPI = () => {
        serverAPI.get('tags', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('isLogged')
            }
        })
        .then(res => {
            this.setState({
                tags: res.data
            })
        })
    }

    updateStars = (id, newStars) => {
        serverAPI.post('ratings', {
            stars: newStars,
            restaurantId: id,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('isLogged')
            }
        }).then(res => {
            if (res.data.Stars === 0) {
                // Unvisited
                this.restaurantAPI();
            }
            else {
                // Visited
                const tags = document.getElementById("tags-" + id)
                tags.classList.add("active");
                tags.querySelector("tbody").classList.add("rating" + res.data.ID);
            }
        })
        .catch(error => {
            this.handleError(error);
        })
    }

    updateTags = (ratingId, tags) => {
        serverAPI.post('ratings/' + ratingId + '/tags', {
            tags: tags,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('isLogged')
            }
        })
        .then(res => {
            this.restaurantAPI();
        })
        .catch(error => {
            this.handleError(error);
        })
    }

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
        const { updateStars, updateTags } = this;

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
                                        updateStars={updateStars}
                                        updateTags={updateTags}/>
                    }/>
                </Switch>
            </div>
        );
    }
};

export default HomePage;