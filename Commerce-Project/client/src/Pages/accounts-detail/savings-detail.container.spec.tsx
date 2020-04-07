import React from 'react';
import { shallow } from 'enzyme';
import SavingsDetail from './savings-detail.container';

describe('Savings Detail', () => {

  it('Render the Savings Detail', () => {
    const component = shallow(<SavingsDetail />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});