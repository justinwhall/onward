import { Badge, Box } from '@chakra-ui/react';

export function Error({ error }: { error: string }): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      <div>
        <Badge colorScheme="red">
          Error,
          {' '}
          {error}
        </Badge>
      </div>
    </Box>
  );
}
