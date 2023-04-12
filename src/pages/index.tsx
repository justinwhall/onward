import Head from 'next/head';
import { Loader } from '@/components/loader';
import { useCallback, useEffect, useState } from 'react';
import { calculateSteps } from '@/services';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid,
} from '@chakra-ui/react';
import { Steps } from '@/components/steps';
import { Error } from '@/components/error';
import Layout from './layout';

interface Form {
  [key: string]: string;
}

export default function Home(): JSX.Element {
  const [error, setError] = useState<string | false>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [steps, setSteps] = useState<ISteps[]>([]);
  const [form, setForm] = useState<Form>({
    A: '',
    B: '',
    C: '',
  });

  const validateForm = useCallback(() => {
    const inputErrors = Object.keys(form).filter((key: string) => form[key].length === 0);
    setFormErrors(inputErrors);
    if (inputErrors.length > 0) {
      return false;
    }
    return true;
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const res = calculateSteps(
      parseInt(form.A, 10),
      parseInt(form.B, 10),
      parseInt(form.C, 10),
    );

    if (res?.error) {
      setError(res?.error);
      return;
    }

    setError(false);
    setSteps(res.steps);
  };

  useEffect(() => {
    const inputs = Object.keys(form).filter((key: string) => form[key].length > 0);
    const newErrors = formErrors.filter((error) => !inputs.includes(error));
    setFormErrors(newErrors);
  }, [form]);

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
            <SimpleGrid columns={3} spacing={10}>
              {['A', 'B', 'C'].map((bucket) => (
                <div key={bucket}>
                  <FormControl isInvalid={formErrors.includes(bucket)}>
                    <FormLabel htmlFor={bucket}>
                      Bucket
                      {' '}
                      {bucket}
                    </FormLabel>
                    <NumberInput
                      name={bucket}
                      onChange={(val) => setForm({ ...form, [bucket]: val })}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {!formErrors.includes(bucket) ? (
                      <FormHelperText>
                        {bucket === 'C' ? 'Target units' : '# of units in the bucket.'}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>Field is required.</FormErrorMessage>
                    )}
                  </FormControl>
                </div>
              ))}
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
          </form>
        </div>
        {error && <Error error={error} />}
        <Steps steps={steps} />
      </Layout>
    </>
  );
}
