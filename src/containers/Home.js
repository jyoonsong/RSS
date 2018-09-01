import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from 'components/Menu';
import RestaurantList from 'components/RestaurantList';

const restaurantNames = ['보트르메종', '꼼뽀스텔라', '쟈니로켓', '시추안하우스', '더플레이트', '랩트웬티포', '이치에', '곰바위',
                        '카페디올', '임병주산동칼국수', '타코칠리칠리', '버터핑거팬케이크', '속초코다리냉면', '에삐과자점',
                        '자주테이블', '트리아농', '울프강스테이크하우스', '파씨오네', '자연은맛있다', '가로수브루잉컴퍼니',
                        '뉴욕비앤비', '몽슈슈', '부자피자', '타따블', '빈브라더스', '코나야', '네기', '강남면옥',
                        '노아베이커리', '나즈드라비', '에뚜왈', '버터핑거팬케이크', '허브족발', '리틀사이공', '알로하포케',
                        '이사벨더부처', 'C27', '부자피자', '136길육미', '쟈니로켓', '베이크치즈타르트', '클로리스',
                        '장스테이크하우스', '시추안하우스', '가로수브루잉컴퍼니'];

class Home extends Component {

    state = {
        restaurants: [
          { id: 0, name: restaurantNames[0], ratings: [{user: 1, star: 4}] },
          { id: 1, name: restaurantNames[1], ratings: [{user: 0, star: 3.5}, {user: 1, star: 2.5}] },
          { id: 2, name: restaurantNames[2], ratings: [{user: 0, star: 0}]}
        ]
    }

    handleChange= (id, newRating) => {
		const {restaurants} = this.state;
		
		const index = restaurants.findIndex(res => res.id === id);
        const selected = restaurants[index];
        const ratingIndex = selected.ratings.findIndex(r => r.user === newRating.user);
        
		const nextRestaurants = [...restaurants];
        nextRestaurants[index].ratings[ratingIndex] = newRating;

		this.setState({
			restaurants: nextRestaurants
		});
	}

    render() {
        const { restaurants } = this.state;

        return (
            <div>
                <div className="bar">
                    <img src={require("img/matcha-white.png")} alt="logo"/>
                </div>
                <Menu/>
                <Switch>
                    <Route exact path="/" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}/>
                    }/>
                    <Route exact path="/visited" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}/>
                    }/>
                    <Route exact path="/unvisited" render={props => 
                        <RestaurantList {...props}
                                        restaurants={restaurants}/>
                    }/>
                </Switch>
            </div>
        );
    }
};

export default Home;