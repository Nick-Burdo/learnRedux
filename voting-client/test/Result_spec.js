/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */
import {expect} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-dom/test-utils';
import {List, Map} from 'immutable';

import {Result} from '../src/components/Result'

describe('Result component', () => {
    it('renders result with vote counts of zero', () => {
        const pair = List.of("Trainspotting", "28 Days Later");
        const tally = Map({"Trainspotting": 5});
        const component = renderIntoDocument(
            <Result pair={pair} tally={tally} />
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [train, days] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(train).to.contain('Trainspotting');
        expect(train).to.contain('5');
        expect(days).to.contain('28 Days Later');
        expect(days).to.contain('0');
    });

    it('invokes callback when pressed Next button', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;
        const pair = List.of("Trainspotting", "28 Days Later");
        const component = renderIntoDocument(
            <Result pair={pair} tally={Map()} next={next} />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    it('render final winner', () => {
        const pair = List.of("Trainspotting", "28 Days Later");
        const component = renderIntoDocument(
            <Result pair={pair} tally={Map()} winner="Trainspotting" />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);

        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain("Trainspotting");
    });
});
 
