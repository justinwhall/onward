import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

const queryClient = new QueryClient();
describe('Home', () => {
  it('renders a heading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});
