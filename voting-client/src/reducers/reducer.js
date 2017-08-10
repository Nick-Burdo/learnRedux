/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 09.08.17
 * @since 1.0.0
 */
import {Map, List} from 'immutable';

import * as types from '../actions/action_types';

const setState = (state, newState) => state.merge(newState);

const resetVote = (state) => {
    const hasVoted = state.get('hasVoted');
    const currentPair = state.getIn(['vote', 'pair'], List());
    if (hasVoted && !currentPair.includes(hasVoted)) {
        return state.remove('hasVoted');
    }
    return state;
};

const vote = (state, entry) => {
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)) {
        return state.set('hasVoted', entry);
    }
    return state;
};

const reducer = (state = Map(), action) => {
    switch (action.type) {
        case types.SET_STATE:
            return resetVote(setState(state, action.state));

        case types.VOTE:
            return vote(state, action.entry);
    }

    return state;
};

export default reducer;
