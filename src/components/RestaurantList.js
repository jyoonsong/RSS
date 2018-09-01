import React, { Component } from 'react';
import Restaurant from './Restaurant';

class RestaurantList extends Component {
    render() {
        const { match, restaurants } = this.props;

        let filteredRestaurants;
        switch (match.path) {
            case '/visited':
                filteredRestaurants = restaurants.filter(
                    ({id, name, ratings}) => {
                        return ratings.findIndex(r => r.user === 0 && r.star !== 0) >= 0
                });
                break;
            case '/unvisited':
                filteredRestaurants = restaurants.filter(
                    ({id, name, ratings}) => {
                        return ratings.findIndex(r => r.user === 0 && r.star === 0) >= 0
                });
                break;
            default:
                filteredRestaurants = restaurants.filter(
                    ({id, name, ratings}) => {
                        return ratings.findIndex(r => r.user === 0) < 0
                });
        }

        const restaurantList = filteredRestaurants.map(
            ({id, name, isChecked, ratings}) => {
                return <Restaurant
                    id={id}
                    name={name}
                    ratings={ratings}
                    isChecked={isChecked}
                    key={id}
                />
            }
        );

        return (
            <div className="container card-list">
                {restaurantList}
            </div>
        );
    }
};

export default RestaurantList;