import React, { Component } from 'react';
import ReactStars from 'react-stars';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Restaurant extends Component {

    state = {
        ratingId: -1
    }

    onStarChange = (newStars) => {
        this.props.updateStars(this.props.id, newStars);
    }

    onTagChange = (e) => {
        const tbody = e.target.parentElement.parentElement.parentElement;
        const ratingId = parseInt(tbody.className.slice(6), 10);

        const updated = Array.from(tbody.querySelectorAll(".is-checked"));
        const results = [];
        updated.forEach(function(ele) {
            results.push(parseInt(ele.getAttribute("id"), 10));
        });

        this.props.updateTags(ratingId, results);
    }
    
    onUnvisited = () => {
        this.props.updateStars(this.props.id, 0);
    }

    onToggle = () => {
        const tags = document.getElementById("tags-" + this.props.id);
        if (!tags.classList.contains("active"))
            tags.classList.add("active");
        else
            tags.classList.remove("active");
    }

    render() {
        const { name, id, ratings, currentUser, image, tagList } = this.props;
        const { onStarChange, onTagChange, onUnvisited, onToggle } = this;
        
        const index = ratings.findIndex(r => r.UserID === currentUser),
              value = (index < 0)? 0 : ratings[index].Stars;

        return (
            <div className="swipe-to-delete">
                <div className="list-item">
                    <div className="list-item-main">
                        <div className="list-item-media"
                             style={{backgroundImage: "url('" + encodeURI(image) + "')"}}>
                        </div>
                        <div className="list-item-content">
                            <h4 className="list-item-heading">{name}
                                <small>강남역</small>
                            </h4>
                            <div className="toggle">
                                <a onClick={onToggle}>
                                    <FontAwesomeIcon icon={faChevronCircleDown} />
                                </a>
                                <a onClick={onUnvisited}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </a>
                            </div>
                            <ReactStars count={5}
                                    size={42}
                                    value={value}
                                    onChange={onStarChange}
                                    color1={'#e9ecef'}
                                    color2={'#fcc419'} />
                        </div>
                    </div>
                    <div id={"tags-" + id} className="list-item-tags">
                        <table>
                            <tbody>
                                {tagList}
                                <tr>
                                    <th></th>
                                    <td>
                                        <button onClick={onTagChange} className="btn">저장하기</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    }

export default Restaurant;