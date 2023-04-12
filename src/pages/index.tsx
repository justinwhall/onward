import Head from 'next/head';
import { Loader } from '@/components/loader';
import { useState } from 'react';
import { calculateSteps } from '@/services';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid,
} from '@chakra-ui/react';
import { Steps } from '@/components/steps';
import Layout from './layout';

export default function Home(): JSX.Element {
  const [containerA, setContainerA] = useState(0);
  const [containerB, setContainerB] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [steps, setSteps] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = calculateSteps(
      parseInt(e.target[0].value, 10),
      parseInt(e.target[1].value, 10),
      parseInt(e.target[2].value, 10),
    );
    setSteps(res);
  };

  return (
    <>
      <Head>
        <title>Water Buckets</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading mb={6}>Water Bucketer 3000</Heading>
        <div>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <SimpleGrid columns={3} spacing={10}>
                <div>
                  <FormLabel htmlFor="bucketa">Bucket A</FormLabel>

                  <NumberInput name="bucketa">
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div>
                  <FormLabel htmlFor="bucketb">Bucket B</FormLabel>

                  <NumberInput name="bucketb">
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div>
                  <FormLabel htmlFor="bucketc">Bucket C</FormLabel>
                  <NumberInput name="bucketc">
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
              </SimpleGrid>
              <Button
                variant="solid"
                size="lg"
                type="submit"
                background="blue"
                color="white"
                mt={6}
              >
                Solve for C
              </Button>
            </FormControl>
          </form>
        </div>
        <Steps steps={steps} />
      </Layout>
    </>
  );
}
