import { Badge, Box } from '@chakra-ui/react';

export function Error(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <div>
        <Badge colorScheme="red">Sorry, we hit a snag. Try again later.</Badge>
      </div>
    </Box>
  );
}
