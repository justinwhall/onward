import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import Home from '@/pages/index';
import DATABASE from '@/lib/db';

const queryClient = new QueryClient();

it('renders homepage unchanged', () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Home initialData={DATABASE[3]} maxAgeDate={maxAgeDate} />
    </QueryClientProvider>,
  );
  expect(container).toMatchSnapshot();
});
