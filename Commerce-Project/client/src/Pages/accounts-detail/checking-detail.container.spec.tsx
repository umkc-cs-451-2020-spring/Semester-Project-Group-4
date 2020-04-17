import React from 'react';
import { shallow } from 'enzyme';
import CheckingDetail from './checking-detail.container';

describe('Checking Detail', () => {

  it('Render the Checking Detail', () => {
    const component = shallow(<CheckingDetail />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
