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
            {
                "ID": 2,
                "CreatedAt": "2018-09-05T13:31:39Z",
                "UpdatedAt": "2018-09-05T13:31:39Z",
                "DeletedAt": null,
                "Stars": 3.5,
                "UserID": 1,
                "RestaurantID": 2
            }
        ]
    },
    {
        "ID": 3,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "쟈니로켓",
        "Description": "",
        "Address": "",
        "Kind": "",
        "Thumbnail": "",
        "Ratings": [
            {
                "ID": 4,
                "CreatedAt": "2018-09-05T13:31:39Z",
                "UpdatedAt": "2018-09-05T13:31:39Z",
                "DeletedAt": null,
                "Stars": 0,
                "UserID": 1,
                "RestaurantID": 3
            }
        ]
    },
    {
        "ID": 4,
        "CreatedAt": "2018-09-05T13:31:39Z",
        "UpdatedAt": "2018-09-05T13:31:39Z",
        "DeletedAt": null,
        "Name": "시추안하우스",
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

const serverAPI = axios.create({
    baseURL: 'https://api.xn--0z2bs25a.com/api/',
    headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem('isLogged')
    }
});

class HomePage extends Component {

    componentWillMount() {
        this.restaurantAPI();
    }

    state = {
        restaurants: initialRestaurants,
        user: parseInt(localStorage.getItem('currentUser'), 10)
    }

    restaurantAPI = () => {

        serverAPI.get('restaurants')
        .then(res => {
            console.log(res);
            this.setState({
                restaurants: res
            });
        })
        .catch(error => {
            console.log(error);
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
            console.log(error);
        })
    }

    render() {
        const { restaurants, user } = this.state;
        const { updateStars } = this;
        const logged = jwt.decode(localStorage.getItem('isLogged'));

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