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

class HomePage extends Component {

    componentWillMount() {
        this.restaurantAPI();
    }

    state = {
        restaurants: initialRestaurants,
        user: parseInt(localStorage.getItem('currentUser'))
    }

    restaurantAPI = () => {
        const serverAPI = localStorage.getItem('serverAPI');
    
        axios.get(serverAPI + 'api/restaurants')
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

    handleChange = (id, newRating) => {
		const {restaurants} = this.state;
		
		const index = restaurants.findIndex(res => res.id === id);
        const selected = restaurants[index];
        const ratingIndex = selected.ratings.findIndex(r => r.user === newRating.user);
        
		const nextRestaurants = [...restaurants];
        nextRestaurants[index].ratings[ratingIndex] = newRating;

		this.setState({
			restaurants: nextRestaurants
		});
	}

    render() {
        const { restaurants, user } = this.state;
        const logged = jwt.decode(localStorage.getItem('isLogged'));

        return (
            <div>
                {
                    !logged && <Redirect to="/login" />
                }
                <Bar/>
                <Menu/>
                <Switch>
                    <Route exact path="/" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}
                                        currentUser={user}/>
                    }/>
                    <Route exact path="/visited" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}
                                        currentUser={user}/>
                    }/>
                    <Route exact path="/unvisited" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}
                                        currentUser={user}/>
                    }/>
                </Switch>
            </div>
        );
    }
};

export default HomePage;