import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import { NewsListContainerComponent } from './NewsListContainer';

describe('NewsListContainerComponent', () => {
    let props;
    let useEffect;

    const mockedUseEffect = () => useEffect.mockImplementationOnce(f => f());

    beforeEach(() => {
        props = {
            history: {},
            isFetching: false,
            news: [{
                title: 'title-1',
                url: 'url-1',
            }],
            topic: 'topic-1',
            getNews: jest.fn(),
            changeTopic: jest.fn(),
        };

        useEffect = jest.spyOn(React, 'useEffect');
    });

    it('should render NewsListContainerComponent', () => {
        const component = shallow(<NewsListContainerComponent {...props} />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render loader', () => {
        const component = shallow(<NewsListContainerComponent {...props} isFetching />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call getNews', () => {
        mount(<NewsListContainerComponent {...props} />);

        expect(props.getNews).toBeCalledWith(props.topic);
    });
});