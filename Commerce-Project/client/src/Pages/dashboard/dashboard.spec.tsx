import React from 'react';
import { shallow } from 'enzyme';
import DashBoard from './dashboard';

describe('Dashboard', () => {

  it('Render the Dashboard', () => {
    const component = shallow(<DashBoard />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});