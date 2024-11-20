import { render, screen } from '@testing-library/react';
import { LeadGrid } from './LeadGrid';
import { MantineProvider } from '@mantine/core';

describe('LeadGrid Integration', () => {
  it('renders with MantineProvider', () => {
    render(
      <MantineProvider>
        <LeadGrid primaryContent={<div>Primary Content</div>} />
      </MantineProvider>
    );
    expect(screen.getByText('Primary Content')).toBeInTheDocument();
  });

  it('handles Mantine theming correctly', () => {
    render(
      <MantineProvider theme={{ colorScheme: 'dark' }}>
        <LeadGrid primaryContent={<div>Dark Mode Content</div>} />
      </MantineProvider>
    );
    expect(screen.getByText('Dark Mode Content')).toBeInTheDocument();
  });
});