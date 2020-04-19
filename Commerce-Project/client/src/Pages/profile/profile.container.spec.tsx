import React from 'react';
import { shallow } from 'enzyme';
import ProfileContainer from './profile.container';

describe('Profile Container', () => {

  it('Render the Profile Container', () => {
    const component = shallow(<ProfileContainer />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});