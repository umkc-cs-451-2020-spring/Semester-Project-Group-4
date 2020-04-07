import { Theme } from './Theme';

describe('Theme', () => {

  it('Make sure Theme exists', () => {
    const component = Theme;

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});