import React from 'react';

import Header from '@/components/Header';
import Swap from '@/components/swap/';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const swap = () => {
  return (
    <Main
      meta={
        <Meta
          title="Swap - Fetcch"
          description="Seamless Crosschain Swapping"
        />
      }
    >
      <div className="h-full w-full bg-gradient-to-r from-[#EADFFF] to-[#FFECD3]">
        <Header />
        <Swap />
      </div>
    </Main>
  );
};

export default swap;
