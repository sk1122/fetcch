import Header from '@/components/Header';
import Faq from '@/components/landing/Faq';
import Hero from '@/components/landing/Hero';
import Process from '@/components/landing/Process';
import Sayhello from '@/components/landing/Sayhello';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={<Meta title="fetcch" description="Seamless Crosschain Swapping" />}
    >
      <Header />
      <Hero />
      <Process />
      <Sayhello />
      <Faq />
    </Main>
  );
};

export default Index;
