/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */

import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import * as types from '../src/actions/action_types';
import makeStore from '../src/store';

describe('store', () => {
    it('store configuration right', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: types.SET_ENTRIES,
            entries: ['Trainspotting', '28 Days Later']
        });

        expect(store.getState()).to.equal(fromJS({
            entries: ['Trainspotting', '28 Days Later']
        }));
    })
});

