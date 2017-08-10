/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 05.08.17
 * @since 1.0.0
 */

import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import * as types from '../src/actions/action_types';
import reducer from '../src/reducers/reducer';

describe('reducer', () => {
    it('has an initial state', () => {
        const action = {
            type: types.SET_ENTRIES,
            entries: ['Trainspotting']
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: types.SET_ENTRIES,
            entries: ['Trainspotting']
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = {type: types.NEXT};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {
            type: types.VOTE,
            entry: 'Trainspotting'
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {'Trainspotting': 1}
            },
            entries: []
        }));
    });

    it('play round', () => {
        const actions = [
            {type: types.SET_ENTRIES, entries: ['Trainspotting', '28 Days Later']},
            {type: types.NEXT},
            {type: types.VOTE, entry: 'Trainspotting'},
            {type: types.VOTE, entry: '28 Days Later'},
            {type: types.VOTE, entry: 'Trainspotting'},
            {type: types.NEXT},
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    });
});