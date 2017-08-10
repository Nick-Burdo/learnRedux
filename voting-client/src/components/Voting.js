/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */
import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/action_creators';

import Vote from './Vote';
import Winner from './Winner';

class Voting extends React.PureComponent {
    render() {
        let {pair, vote, hasVoted, winner} = this.props;

        return (
            <div className="voting">
                {
                    winner ?
                        <Winner
                            winner={winner}
                            ref="winner"
                        /> :
                        <Vote
                            pair={pair}
                            vote={vote}
                            hasVoted={hasVoted}
                        />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.get('hasVoted'),
        winner: state.get('winner')
    }
}

const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);

export {Voting, VotingContainer};
 
