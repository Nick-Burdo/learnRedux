/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Router, Route, hasHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import reducer from './reducers/reducer';
import * as types from './actions/action_types';
import {setState} from './actions/action_creators';
import remoteActionMiddleware from './remote_action_middleware';

import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultContainer} from './components/Result';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const middleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = middleware(reducer);
const routes = (<Route component={App}>
    <Route path="/result" component={ResultContainer}/>
    <Route path="/" component={VotingContainer}/>
</Route>);

socket.on('state', state => store.dispatch(setState(state)));

ReactDOM.render(
    <Provider store={store}>
        <Router history={hasHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
