import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUtensils } from '@fortawesome/free-solid-svg-icons';

class Restaurant extends Component {

    state = {
        ratingId: -1
    }

    render() {
        const { name, id, ratings, currentUser, image} = this.props;
        
        const index = ratings.findIndex(r => r.UserID === currentUser);
        const value = parseFloat(4.4 -(id/10)).toFixed(1);

        return (
            <div className="swipe-to-delete">
                <div className="list-item">
                    <div className="list-item-main">
                        <div className="list-item-media"
                             style={{backgroundImage: "url('" + encodeURI(image) + "')"}}>
                        </div>
                        <div className="list-item-content">
                            <h4 className="list-item-heading">
                                <span className="rank">{id}위 </span>
                                {name}
                                <small>강남역</small>
                            </h4>
                            <div className="list-item-predict">
                                <span className="text-blue">예상 ★ {(value < 0)? 0.0 : value}</span>
                                {(index <= 0)? "" : "실제 ★ " + ratings[index].Stars}
                            </div>
                            <div className="toggle">
                                <a>
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Restaurant;