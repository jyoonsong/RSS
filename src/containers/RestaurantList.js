import React, { Component } from 'react';
import Restaurant from 'components/Restaurant';
import Tag from 'components/Tag';
import dictionary from 'lib/dictionary.json';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

class RestaurantList extends Component {

    images = importAll(require.context('img/restaurants', false, /\.(png|jpe?g|svg)$/));

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
        const { tagList, images } = this;

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

        const tagListNew = tags.filter(({tagName}) =>
            tagName.concat("the" + tag.ID)
        );

        // list into card
        const restaurantList = filteredRestaurants.map(
            ({ID, Name, Ratings}) => {
                return  <Restaurant
                            id={ID}
                            name={Name}
                            ratings={Ratings}
                            key={ID}
                            currentUser={currentUser}
                            image={images["res" + ID + ".jpg"]} // TODO: change image to column not name-based
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