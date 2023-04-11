import Head from 'next/head';
import { Loader } from '@/components/loader';
import Layout from './layout';

export default function Home(): JSX.Element {
  // const [ageError, setAgeError] = useState<string>('');


  return (
    <>
      <Head>
        <title>Water Buckets</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        Hello world
      </Layout>
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: {}
}> {

  return {
    props: {
    },
  };
}
