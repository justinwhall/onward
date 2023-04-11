import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import Home from '@/pages/index';

const queryClient = new QueryClient();

it('renders homepage unchanged', () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );
  expect(container).toMatchSnapshot();
});
