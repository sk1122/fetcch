import Hero from '@/components/landing/Hero';
import Process from '@/components/landing/Process';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={<Meta title="fetcch" description="Seamless Crosschain Swapping" />}
    >
      <Hero />
      <Process />
    </Main>
  );
};

export default Index;
