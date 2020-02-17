import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { NewsInfo } from './NewsInfo';

describe('NewsInfo Component', () => {
    let props;

    beforeEach(() => {
        props = {
            info: {
                subsection: 'subsection-1',
                title: 'title-1',
                abstract: 'abstract-1',
                section: 'section-1',
            },
        };
    });

    it('', () => {
        const component = shallow(<NewsInfo {...props} />);

        expect(toJson(component)).toMatchSnapshot();
    });
});