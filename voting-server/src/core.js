/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.00 05.08.17
 * @since 1.00
 */
import {List, Map} from 'immutable';

const INITIAL_STATE = Map();

/**
 * add entries to the state
 *
 * @param state (immutable Map)
 * @param entries (Array | immutable List)
 *
 * @returns next state (immutable Map)
 */
const setEntries = (state, entries) => state.set('entries', List(entries));

/**
 * returns winner entry of the vote (both if a draw)
 * @param vote (immutable Map)
 * @returns Array
 */
const getWinners = (vote) => {
    if (!vote) return [];

    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if (aVotes > bVotes) return [a];
    if (aVotes < bVotes) return [b];
    return [a, b];
};

/**
 * move winner to the end of entries list (move both if a draw)
 * then take 2 first entries for vote
 *
 * @param state (immutable Map)
 *
 * @returns next state (immutable Map)
 */
const next = (state) => {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    if (entries.size === 1) {
        return state
            .remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    }

    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
};


/**
 * add a voting result for the selected entry
 *
 * @param state (immutable Map)
 * @param entry (String)
 *
 * @returns  next state (immutable Map)
 */
const vote = (state, entry) => state.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
);

export {INITIAL_STATE, setEntries, next, vote}
 
