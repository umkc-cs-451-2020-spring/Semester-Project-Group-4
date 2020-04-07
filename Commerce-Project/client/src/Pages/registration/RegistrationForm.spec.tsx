import React from 'react';
import { shallow } from 'enzyme';
import RegistrationForm from './RegistrationForm';

describe('Registration Form', () => {

  it('Render the Registration Form', () => {
    const component = shallow(<RegistrationForm />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});