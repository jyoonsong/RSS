import React, { Component } from 'react';
import ReactStars from 'react-stars'

class Restaurant extends Component {

    render() {
        const { name, id, ratings } = this.props;
        
        const index = ratings.findIndex(r => r.UserID === 1),
              value = (index < 0)? 0 : ratings[index].Stars;

        const handleStarsChange = (newStars) => {
            console.log(newStars)
        }

        return (
        <div className="card" id={id}>
            <div className="card-main">
                <div className="card-main-media">
                    <img src={require('img/restaurants/' + name + '.jpg')} alt={name}/>
                </div>
                <div className="card-main-content">
                    <h3>{name}</h3>
                    <small>강남역</small>
                    <ReactStars count={5}
                                size={45}
                                value={value}
                                onChange={handleStarsChange}
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