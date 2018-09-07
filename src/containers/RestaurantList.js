import React, { Component } from 'react';
import Restaurant from 'components/Restaurant';
import Tag from 'components/Tag';
import dictionary from 'lib/dictionary.json';

class RestaurantList extends Component {

    count = 0;

    tagList = Object.keys(dictionary).map((theme, i) => {
        const tags = Object.keys(dictionary[theme]).map((tag, j) => {
                        return <Tag key={j} id={this.count++}>{dictionary[theme][tag]}</Tag>;
                    });
        return  (<tr key={i}>
                    <th>{theme}</th>
                    <td>{tags}</td>
                </tr>);
    });

    render() {
        const { match, restaurants, currentUser, updateTags, updateStars } = this.props;
        const { tagList } = this;

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
                            tagList={tagList}
                            updateTags={updateTags}
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