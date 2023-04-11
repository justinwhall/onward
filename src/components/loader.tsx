import { Box, Skeleton, Stack } from '@chakra-ui/react';

export function Loader(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        height: '90vh',
      }}
      py={8}
      opacity={0.4}
    >
      <Stack maxWidth={400} display="block" width="100%">
        <Skeleton height="20px" startColor="teal" endColor="white" />
        <Skeleton height="20px" startColor="teal" endColor="white" />
        <Skeleton height="20px" startColor="teal" endColor="white" />
      </Stack>
    </Box>
  );
}
