import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import User from './User';

configure({adapter: new Adapter()});

describe('User', () => {
    let wrapper;
    
    beforeEach(() => {
        let user = {
            id: 1,
            first_name: 'jorge',
            last_name: 'cortes',
            city: 'Chihuahua',
            state: 'CUU',
        };
        wrapper = shallow(<User key={user.id} user={user} edit={() => {}} remove={() => {}} />);
    });

    it('have 2 buttons', () => {
        expect(wrapper.find('button')).toHaveLength(2);
    });

    it('have 6 td', () => {
        expect(wrapper.find('td')).toHaveLength(6);
    });
});