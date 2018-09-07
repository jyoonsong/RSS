import React, { Component } from 'react';
import Restaurant from 'components/Restaurant';
import SwipeToDelete from 'react-swipe-to-delete-component';

class RestaurantList extends Component {

    render() {
        const { match, restaurants, currentUser, updateStars } = this.props;

        // filter list with path
        const filteredRestaurants = restaurants.filter(({Ratings}) => {
            switch (match.url) {
                case '/visited':
                    return Ratings.findIndex(r => r.UserID === currentUser && r.Stars !== 0) >= 0;
                case '/unvisited':
                    return Ratings.findIndex(r => r.UserID === currentUser && r.Stars === 0) >= 0;
                default:
                    return Ratings.findIndex(r => r.UserID === currentUser) < 0;
            }
        });

        // list into card
        const restaurantList = filteredRestaurants.map(
            ({ID, Name, Ratings}) => {
                return  <Restaurant
                            id={ID}
                            name={Name}
                            ratings={Ratings}
                            key={ID}
                            currentUser={currentUser}
                            updateStars={updateStars}
                        />
            }
        );

        return (
            <div className="container list-group">
                {restaurantList}
            </div>
        );
    }
};

export default RestaurantList;