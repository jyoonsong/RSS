import React, { Component } from 'react';
import ReactStars from 'react-stars'

class Restaurant extends Component {

    render() {
        const { name, id, ratings } = this.props;
        
        const index = ratings.findIndex(r => r.user === 0),
              value = (index < 0)? 0 : ratings[index].star;

        const ratingChanged = (newRating) => {
            console.log(newRating)
        }

        return (
        <div className="card">
            <div className="card-img">
                <img src={require('img/' + name + '.jpg')} alt={id}/>
            </div>
            <div className="card-content">
                <h4>{name}</h4>
                <ReactStars count={5}
                            size={42}
                            value={value}
                            onChange={ratingChanged}
                            color1={'#e9ecef'}
                            color2={'#fcc419'} />
            </div>
        </div>
        );
    }
    }

export default Restaurant;