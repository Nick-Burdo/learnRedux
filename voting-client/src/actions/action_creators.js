/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 09.08.17
 * @since 1.0.0
 */
import * as types from './action_types';

export const setState = state => ({
    type: types.SET_STATE,
    state
});
 
export const vote = entry => ({
    meta: {remote: true},
    type: types.VOTE,
    entry
});

export const next = () => ({
    meta: {remote: true},
    type: types.NEXT
});

