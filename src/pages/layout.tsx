import { Container } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Container maxW="container.sm" color="gray.600" p={10}>
      {children}
    </Container>
  );
}
