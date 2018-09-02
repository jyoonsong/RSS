import React, { Component } from 'react';
import Restaurant from './Restaurant';

class RestaurantList extends Component {
    render() {
        const { match, restaurants } = this.props;

        // filter list with path
        const filteredRestaurants = restaurants.filter(
            ({id, name, ratings}) => {
            switch (match.path) {
                case '/visited':
                    return ratings.findIndex(r => r.user === 0 && r.star !== 0) >= 0;
                case '/unvisited':
                    return ratings.findIndex(r => r.user === 0 && r.star === 0) >= 0;
                default:
                    return ratings.findIndex(r => r.user === 0) < 0;
            }
        });

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