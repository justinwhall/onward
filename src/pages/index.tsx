import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setError(false);
    setLoading(true);
    let data = [];

    try {
      const res = await fetch('/api/solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      data = await res.json();

      if (data?.error) {
        setError(data?.error);
        setSteps([]);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }

    setSteps(data?.steps || []);
    setLoading(false);
  };

  useEffect(() => {
    const inputs = Object.keys(form).filter((key: string) => form[key].length > 0);
    const newErrors = formErrors.filter((err: string) => !inputs.includes(err));
    setFormErrors(newErrors);
  }, [form, formErrors]);

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
              isLoading={loading}
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
