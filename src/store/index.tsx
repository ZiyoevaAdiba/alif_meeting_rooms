import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const store = createStore(
    rootReducer(history),
    compose(
        composeWithDevTools(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            )
        )
    ),
);

export default store;
