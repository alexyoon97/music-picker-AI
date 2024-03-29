import Head from "next/head"
import { Layout } from "@/components/layout"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const { push } = useRouter();
  
    useEffect(() => {
       push('/home');
    }, []);
  return (
    <Layout>
      <Head>
        <title>MusicPicker AI</title>
        <meta
          name="description"
          content="Next.js template for building apps with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  )
}
