import React, { Component } from 'react';
import ReactStars from 'react-stars'
import SwipeToDelete from 'react-swipe-to-delete-component';

class Restaurant extends Component {

    state = {
        ratingId: -1
    }

    render() {
        const { name, id, ratings, currentUser, tagList, updateTags, updateStars } = this.props;
        
        const index = ratings.findIndex(r => r.UserID === currentUser),
              value = (index < 0)? 0 : ratings[index].Stars;

        const onStarChange = (newStars) => {
            updateStars(id, newStars);
        }

        const onTagChange = (e) => {
            const tbody = e.target.parentElement.parentElement.parentElement;
            const ratingId = parseInt(tbody.className.slice(6), 10);
            console.log(tbody);

            const updated = Array.from(tbody.querySelectorAll(".is-checked"));
            const results = [];
            updated.forEach(function(ele) {
                results.push(parseInt(ele.getAttribute("id"), 10));
            });
            console.log(tbody.querySelectorAll(".is-checked"));

            updateTags(ratingId, results);
        }
        
        const onUnvisited = () => {
            updateStars(id, 0);
        }

        return (
            <SwipeToDelete  key={id}
                            onDelete={onUnvisited}>
                <a className="list-item">
                    <div className="list-item-main">
                        <div className="list-item-media"
                             style={{backgroundImage: "url('" + require('img/restaurants/' + name + '.jpg') + "')"}}>
                        </div>
                        <div className="list-item-content">
                            <h4 className="list-item-heading">{name}
                                <small>강남역</small>
                            </h4>
                            <ReactStars count={5}
                                    size={45}
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
                </a>
            </SwipeToDelete>
        );
    }
    }

export default Restaurant;