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
            <div className="card-main">
                <div className="card-main-media">
                    <img src={require('img/' + name + '.jpg')} alt={name}/>
                </div>
                <div className="card-main-content">
                    <h4>{name}</h4>
                    <ReactStars count={5}
                                size={45}
                                value={value}
                                onChange={ratingChanged}
                                color1={'#e9ecef'}
                                color2={'#fcc419'} />
                </div>
            </div>
            <div className="card-footer">
                <div className="card-footer-button">안 가봤어요</div>
            </div>
        </div>
        );
    }
    }

export default Restaurant;