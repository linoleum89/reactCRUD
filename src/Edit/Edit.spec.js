import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Edit from './Edit';

configure({adapter: new Adapter()});

describe('Edit', () => {
    let wrapper;
    
    beforeEach(() => {
        let user = {
            id: 1,
            first_name: 'jorge',
            last_name: 'cortes',
            city: 'Chihuahua',
            state: 'CUU'
        };
        wrapper = shallow(<Edit user={user} save={() => {}} changed={() => {}}/>);
    });

    it('have 4 inputs for edit', () => {
        expect(wrapper.find('input')).toHaveLength(4);
    });

    it('have 1 button to save', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
});