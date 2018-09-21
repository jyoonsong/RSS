import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Bar from 'components/Bar';
import Menu from 'components/Menu';
import RestaurantList from 'containers/RestaurantList';
import RecommendedList from 'containers/RecommendedList';

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
        ]
    },
    {
        "ID": 2,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "꼼뽀스텔라",
        "Description": "",
        "Address": "",
        "Kind": "",
        "Thumbnail": "",
        "Ratings": [
        ]
    },
    {
        "ID": 3,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "C27",
        "Description": "",
        "Address": "",
        "Kind": "",
        "Thumbnail": "",
        "Ratings": [
        ]
    },
    {
        "ID": 4,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "이춘복스시",
        "Description": "",
        "Address": "",
        "Kind": "",
        "Thumbnail": "",
        "Ratings": []
    },
    {
        "ID": 5,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "더플레이트",
        "Description": "",
        "Address": "",
        "Kind": "",
        "Thumbnail": "",
        "Ratings": []
    }

];

const initialTags = [];

class HomePage extends Component {

    serverAPI = this.props.api;

    state = {
        restaurants: initialRestaurants,
        tags: initialTags,
        user: parseInt(localStorage.getItem('currentUser'), 10),
        logged: false
    }

    restaurantAPI = () => {
        this.serverAPI.get('restaurants', {
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
        this.serverAPI.get('tags', {
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
        this.serverAPI.post('ratings', {
            stars: newStars,
            restaurantId: id,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('isLogged')
            }
        }).then(res => {
            if (res.data.Stars === 0) {
                const { restaurants } = this.state;

                const nextRestaurants = [...restaurants];
                nextRestaurants[id - 1].Ratings.push(res.data);

                this.setState({
                  restaurants: nextRestaurants
                });
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
        this.serverAPI.post('ratings/' + ratingId + '/tags', {
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
        alert(error.message);
    }

    componentWillMount() {
        if (jwt.decode(localStorage.getItem('isLogged'))) {
            this.serverAPI.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isLogged');
            this.setState({
                logged: true,
            });
            this.restaurantAPI();
            this.tagAPI();
        }
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
                    <Route exact path="/recommend" render={props => 
                        <RecommendedList {...props}
                                        restaurants={restaurants}
                                        currentUser={user}/>
                    }/>
                </Switch>
            </div>
        );
    }
};

export default HomePage;