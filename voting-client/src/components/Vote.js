/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */
import React from 'react';

class Vote extends React.PureComponent {
    render() {
        let {pair, vote, hasVoted} = this.props;
        return (
            <div>
                {
                    (pair || []).map(entry => (
                        <button
                            key={entry}
                            onClick={() => vote(entry)}
                            disabled={!!hasVoted}
                        >
                            <h1>{entry}</h1>
                            {
                                hasVoted === entry ?
                                    <div className="label">
                                        Voted
                                    </div> :
                                    null
                            }
                        </button>
                    ))
                }
            </div>
        )
    }
}

export default Vote;
 
