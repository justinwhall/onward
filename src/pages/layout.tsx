import { Header } from '@/components/header';
import { Container } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Container maxW="container.xl" color="gray.600">
      {children}
    </Container>
  );
}
