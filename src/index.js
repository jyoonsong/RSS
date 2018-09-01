import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import registerServiceWorker from './registerServiceWorker';

// redux
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

// styles
import 'styles/main.scss';

// store
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
