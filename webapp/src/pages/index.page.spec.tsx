import { render, screen } from '@testing-library/react';

import WebApp from './index.page';

describe('Main Page Component', () => {
  it('should renders Main page correctly', () => {
    render(<WebApp />);
    expect(screen.getByText('hello world!')).toBeInTheDocument();
  });
});
