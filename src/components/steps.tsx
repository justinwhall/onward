import {
  EMPTY_B, EMPTY_A, FILL_A, FILL_B, POUR_INTO_A, POUR_INTO_B,
} from '@/constants';
import {
  Box, Card, CardBody, Heading, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { IoWater } from 'react-icons/io5';
import {
  BsBucketFill, BsPaintBucket, BsBucket, BsWater,
} from 'react-icons/bs';

const StepMap: { [key: string]: Function } = {
  [POUR_INTO_A]: () => (
    <>
      <Icon as={BsPaintBucket} />
      <Box as="span">Transfer to A →</Box>
      <Icon as={BsBucketFill} />
    </>
  ),
  [POUR_INTO_B]: () => (
    <>
      <Icon as={BsPaintBucket} />
      <Box as="span">Transfer to B →</Box>
      <Icon as={BsBucketFill} />
    </>
  ),
  [FILL_A]: () => (
    <>
      <Icon as={IoWater} />
      <Box as="span">Fill A →</Box>
      <Icon as={BsBucketFill} />
    </>
  ),
  [FILL_B]: () => (
    <>
      <Icon as={IoWater} />
      <Box as="span">Fill B →</Box>
      <Icon as={BsBucketFill} />
    </>
  ),
  [EMPTY_A]: () => (
    <>
      <Icon as={BsWater} />
      <Box as="span">Empty A →</Box>
      <Icon as={BsBucket} />
    </>
  ),
  [EMPTY_B]: () => (
    <>
      <Icon as={BsWater} />
      <Box as="span">Empty B →</Box>
      <Icon as={BsBucket} />
    </>
  ),
};

export function Steps({ steps }: { steps: ISteps[] }): JSX.Element | null {
  if (!steps.length) {
    return null;
  }

  return (
    <>
      <Heading as="h2" size="md" mt={12}>
        {steps.length}
        {' '}
        Steps
      </Heading>
      {steps.map((step) => (
        <Card my={6} key={step.id} color="blue">
          <CardBody
            sx={{
              span: {
                display: 'inline-block',
                width: '200px',
              },
            }}
            textAlign="center"
          >
            {StepMap[step.desc]()}
          </CardBody>
        </Card>
      ))}
      <Heading as="h2" size="md" mt={12}>
        Table View
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Bucket A</Th>
              <Th>Bucket B</Th>
            </Tr>
          </Thead>
          <Tbody>
            {steps.map((step) => (
              <Tr key={step.id}>
                <Td>{step.containerA}</Td>
                <Td>{step.containerB}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
