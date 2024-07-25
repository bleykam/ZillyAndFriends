import { expect, test, describe, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import AboutUs from './AboutUs';
import { it } from 'vitest'



describe('AboutUs Component', () => {
  it('should match the snapshot', () => {
    const { container } = render(<AboutUs />);
    expect(container).toMatchSnapshot();
  });
});
