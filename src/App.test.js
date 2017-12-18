import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Edit from './Edit/Edit';
import User from './User/User';

configure({adapter: new Adapter()});

describe('App', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('should have Edit component inside', () => {
        expect(wrapper.find(Edit)).toBeDefined();
        expect(wrapper.find(Edit)).toHaveLength(0);
    });

    it('should have Edit component visible until we set showEdit to true', () => {
        wrapper.setState({
            showEdit: true
        });
        expect(wrapper.find(Edit)).toHaveLength(1);
    });

    it('should have User component', () => {
        expect(wrapper.find(User)).toBeDefined();
        expect(wrapper.find(User)).toHaveLength(0);
    });

    it('should have User visible until we set the state with some users', () => {
        wrapper.setState({
            users: [
                {
                    id: 1,
                    first_name: 'jorge',
                    last_name: 'cortes',
                    city: 'Chihuahua',
                    state: 'CUU'
                }
            ]
        });
        expect(wrapper.find(User)).toHaveLength(1);
    });
});