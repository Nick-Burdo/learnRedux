/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 05.08.17
 * @since 1.0.0
 */

import * as types from '../actions/action_types';
import {INITIAL_STATE, setEntries, next, vote} from '../core';

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_ENTRIES:
            return setEntries(state, action.entries);

        case types.NEXT:
            return next(state);

        case types.VOTE:
            return vote(state, action.entry);

        default:
            return state
    }
};

export default reducer;
 
