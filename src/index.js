import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

// redux
import { Provider } from 'react-redux';
import store from 'store/store';

// styles
import 'styles/main.scss';

// store

ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
