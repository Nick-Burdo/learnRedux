/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 08.08.17
 * @since 1.0.0
 */

import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/action_creators';

import Winner from './Winner';

class Result extends React.PureComponent {
    getVotes(entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }
        return 0
    }

    render() {
        let {pair, next, winner} = this.props;
        return winner ?
            <Winner ref="winner" winner={winner}/> :
            (
                <div className="result">
                    <div className="tally">
                        {
                            (pair || []).map(entry => (
                                <h1 key={entry} className="entry">
                                    {entry}
                                    {' '}
                                    <small>
                                        ({this.getVotes(entry)} votes)
                                    </small>
                                </h1>
                            ))
                        }
                    </div>
                    <div className="management">
                        <button
                            ref="next"
                            className="nextBtn"
                            onClick={next}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    }
}

const ResultContainer = connect(mapStateToProps, actionCreators)(Result);


export {Result, ResultContainer};

 
