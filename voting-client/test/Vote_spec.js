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
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-dom/test-utils';
import {List} from 'immutable';

import {Voting} from '../src/components/Voting'

describe('Voting component', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });
    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]} vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal("Trainspotting");
    });
    it('disable buttons after voting', () => {
        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]} hasVoted="Trainspotting"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].disabled).to.equal(true);
        expect(buttons[1].disabled).to.equal(true);
    });
    it('add label to voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]} hasVoted="Trainspotting"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });
    it('show Winner only', () => {
        const component = renderIntoDocument(
            <Voting winner="Trainspotting"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);

        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting')
    });
    it('render as pure component', () => {
        const pair = ["Trainspotting", "28 Days Later"];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

        expect(firstButton.textContent).to.equal("Trainspotting");

        pair[0] = 'Sunshine';

        component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

        expect(firstButton.textContent).to.equal("Trainspotting");
    });
    it('change DOM when property has changed', () => {
        const pair = List.of("Trainspotting", "28 Days Later");
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

        expect(firstButton.textContent).to.equal("Trainspotting");

        const nextPair = pair.set(0, 'Sunshine');

        component = ReactDOM.render(
            <Voting pair={nextPair}/>,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

        expect(firstButton.textContent).to.equal("Sunshine");
    });
});
 
