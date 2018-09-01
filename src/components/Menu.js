import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {

    const activeStyle = {
        color: '#000',
        fontWeight: '700'
    };

    return (
        <div>
            <ul className="tab-list">
                <li className="tab"><NavLink exact to="/" activeStyle={activeStyle}>평가하기</NavLink></li>
                <li className="tab"><NavLink exact to="/visited" activeStyle={activeStyle}>가봤어요</NavLink></li>
                <li className="tab"><NavLink exact to="/unvisited" activeStyle={activeStyle}>안가봤어요</NavLink></li>
            </ul>
        </div>
    );
};

export default Menu;