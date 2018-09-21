import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faTrashAlt, faStar, faArchive } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {

    const activeStyle = {
        color: '#000',
        fontWeight: '700'
    };

    return (
        <div className="tab-wrapper">
            <ul className="tab-list">
                <li className="tab">
                    <NavLink exact to="/recommend" activeStyle={activeStyle}>
                        <FontAwesomeIcon icon={faTrophy} />
                        추천
                    </NavLink>
                </li>
                <li className="tab">
                    <NavLink exact to="/" activeStyle={activeStyle}>
                        <FontAwesomeIcon icon={faStar} />
                        평가하기
                    </NavLink>
                </li>
                <li className="tab">
                    <NavLink exact to="/visited" activeStyle={activeStyle}>
                        <FontAwesomeIcon icon={faArchive} />
                        평가내역
                    </NavLink>
                </li>
                <li className="tab">
                    <NavLink exact to="/unvisited" activeStyle={activeStyle}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        휴지통
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Menu;