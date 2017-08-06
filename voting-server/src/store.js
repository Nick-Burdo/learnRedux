/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */

import {createStore} from 'redux';
import reducer from './reducers/reducer';

const makeStore = () => createStore(reducer);

export default makeStore;
 
