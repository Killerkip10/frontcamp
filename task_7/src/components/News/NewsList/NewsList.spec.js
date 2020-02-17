import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { NewsList } from './NewsList';

describe('NewsList Component', () => {
    let props;

    beforeEach(() => {
        props = {
            news: [{
                title: 'title-1',
                url: 'url-1',
            }],
            topic: 'topic-1',
            changeTopic: jest.fn(),
            clickDetails: jest.fn(),
        };
    });

    it('should render NewsList', () => {
        const component = shallow(<NewsList {...props} />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call handleTopicChange', () => {
        const value = 'option-1';
        const component = shallow(<NewsList {...props} />);

        component.find('select').simulate('change', { target: { value } });

        expect(props.changeTopic).toBeCalledWith(value);
    });
});