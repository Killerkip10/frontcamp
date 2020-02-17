import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import { NewsInfoContainerComponent } from './NewsInfoContainer';

describe('NewsInfoContainerComponent', () => {
    let props;

    beforeEach(() => {
        props = {
            isFetching: false,
            info: {
                subsection: 'subsection-1',
                title: 'title-1',
                abstract: 'abstract-1',
                section: 'section-1',
            },
            getNewsById: jest.fn(),
        };
    });

    it('should render NewsInfoContainerComponent', () => {
        const component = shallow(<NewsInfoContainerComponent {...props} />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render loader', () => {
        const component = shallow(<NewsInfoContainerComponent {...props} isFetching />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call getNewsById', () => {
        mount(<NewsInfoContainerComponent {...props} />);

        expect(props.getNewsById).toBeCalled();
    });
});