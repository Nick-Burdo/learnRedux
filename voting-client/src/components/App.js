/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 08.08.17
 * @since 1.0.0
 */

import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of("Trainspotting", "28 Days Later");
const tally = Map({"Trainspotting": 5, "28 Days Later": 4});

class App extends React.Component {
    render()
    {
        return this.props.children
    }
}

export default App;

 
