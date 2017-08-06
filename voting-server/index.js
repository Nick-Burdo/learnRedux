/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */

import makeStore from './src/store';
import startServer from './src/server';
import * as types from './src/actions/action_types';

export const store = makeStore();
startServer(store);

store.dispatch({
    type: types.SET_ENTRIES,
    entries: require('./entries.json')
});
store.dispatch({
    type: types.NEXT
});