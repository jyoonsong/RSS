import React, { Component } from 'react';
import Recommended from 'components/Recommended';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

class RecommendedList extends Component {

    images = importAll(require.context('img/restaurants', false, /\.(png|jpe?g|svg)$/));

    render() {
        const { restaurants, currentUser } = this.props;
        const { images } = this;

        // list into card
        const restaurantList = restaurants.map(
            ({ID, Name, Ratings}) => {
                return  <Recommended
                            id={ID}
                            name={Name}
                            ratings={Ratings}
                            key={ID}
                            currentUser={currentUser}
                            image={images["res" + ID + ".jpg"]}
                        />
            }
        );

        return (
            <div className="container list-group">
                {restaurantList}
                <p className="text-center"><small>마지막입니다</small></p>
            </div>
        );
    }
};

export default RecommendedList;