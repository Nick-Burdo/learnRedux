/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 07.08.17
 * @since 1.0.0
 */

import React from 'react';

class Winner extends React.PureComponent {
    render() {
        let {winner} = this.props;
        return (
            <div className="winner">
                Winner is {winner}!
            </div>
        )
    }
}

export default Winner;

 
