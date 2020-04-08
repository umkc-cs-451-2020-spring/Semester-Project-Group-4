import React from 'react';
import { shallow } from 'enzyme';
import { NotificationCard } from './Card';

describe('Notification Card', () => {

  it('Render the Notification Card', () => {
    const component = shallow(<NotificationCard message='test' />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});