import React from 'react';
import { shallow } from 'enzyme';
import NotificationsContainer from './notifications-container';

describe('Notifications Container', () => {

  it('Render the Notifications Container', () => {
    const component = shallow(<NotificationsContainer />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});