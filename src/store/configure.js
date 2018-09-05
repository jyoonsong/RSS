import { createStore } from 'redux';

const UPDATE_STAR = 'UPDATE_STAR';
const UPDATE_REVIEW = 'UPDATE_REVIEW';

const initialState = {
  star: null,
  review: ""
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_STAR:
      return { 
        star: state.star
      };
    case UPDATE_REVIEW:
      return { 
        review: state.review
      };
    default:
      return state;
  }
};
  
const configureStore = (initialState) => {
  
    const store = createStore(reducer, initialState);
  
    return store;
};

export default configureStore;