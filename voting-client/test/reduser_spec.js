/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 09.08.17
 * @since 1.0.0
 */

import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import * as types from '../src/actions/action_types';
import reducer from '../src/reducers/reducer';

describe('reducer', () => {
    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: types.SET_STATE,
            state: Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({Trainspotting: 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles SET_STATE with simple JS', () => {
        const initialState = Map();
        const action = {
            type: types.SET_STATE,
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: Map({Trainspotting: 1})
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: types.SET_STATE,
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles VOTE by set hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        });
        const action = {
            type: types.VOTE,
            entry: 'Trainspotting'
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            hasVoted: 'Trainspotting'
        }));
    });

    it('cancel wrong vote entry', () => {
        const state = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        });
        const action = {
            type: types.VOTE,
            entry: 'Sunshine'
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('clean hasVoted if vote pair has changed', () => {
        const state = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            hasVoted: 'Trainspotting'
        });
        const action = {
            type: types.SET_STATE,
            state: {
                vote: {
                    pair: ['Sunshine', 'Slumdog Millionaire']
                }
            }
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Sunshine', 'Slumdog Millionaire']
            }
        }));
    });
});