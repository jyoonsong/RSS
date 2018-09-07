import React, { Component } from 'react';
import ReactStars from 'react-stars'
import SwipeToDelete from 'react-swipe-to-delete-component';

class Restaurant extends Component {

    render() {
        const { name, id, ratings, currentUser, updateStars } = this.props;
        
        const index = ratings.findIndex(r => r.UserID === currentUser),
              value = (index < 0)? 0 : ratings[index].Stars;

        const onStarChange = (newStars) => {
            updateStars(id, newStars);
        }
        
        const onUnvisited = () => {
            updateStars(id, 0);
        }

        // const onTagChange = (newTags) => {
        //     updateTags(id, newTags);
        // }

        return (
            <SwipeToDelete  key={id}
                            onDelete={onUnvisited}>
                <a className="list-group-item">
                    <h4 className="list-group-item-heading">{name}
                        <small>강남역</small>
                    </h4>
                    <ReactStars count={5}
                                size={45}
                                value={value}
                                onChange={onStarChange}
                                color1={'#e9ecef'}
                                color2={'#fcc419'} />
                </a>
            </SwipeToDelete>

        // <div className="card">
        //     <div className="card-main">
        //         <div className="card-main-media">
        //             <img src={require('img/restaurants/C27.jpg')} alt={name}/>
        //         </div>
        //         <div className="card-main-content">
        //             <h3>{name}</h3>
        //             <small>강남역</small>
        //             <ReactStars count={5}
        //                         size={45}
        //                         value={value}
        //                         onChange={onStarChange}
        //                         color1={'#e9ecef'}
        //                         color2={'#fcc419'} />
        //         </div>
        //     </div>
        //     <div className="card-footer">
        //         <div className="card-footer-button" onClick={onUnvisited}>안 가봤어요</div>
        //     </div>
        // </div>
        );
    }
    }

export default Restaurant;