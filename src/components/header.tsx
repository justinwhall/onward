import { Box, Show, Text } from '@chakra-ui/react';

export function Header(): JSX.Element {
  return (
    <Box
      sx={{
        '@media (max-width: 767px)': {
          '.link': {
            display: 'block',
            padding: '10px 0',
          },
        },
      }}
      display={{ md: 'flex' }}
      gap={3}
      p={8}
      fontWeight="semi-bold"
    >
      <Box display={{ md: 'flex' }} gap={4}>
        <Text className="link">Help</Text>
        <Text className="link">Sign In</Text>
      </Box>
    </Box>
  );
}
