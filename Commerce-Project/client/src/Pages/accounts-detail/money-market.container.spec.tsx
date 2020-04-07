import React from 'react';
import { shallow } from 'enzyme';
import MoneyMarketDetail from './money-market-detail.container';

describe('Money Market Detail', () => {

  it('Render the Money Market Detail', () => {
    const component = shallow(<MoneyMarketDetail />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});