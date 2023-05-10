import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Swap from '@/components/swap/';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import toast from "react-hot-toast";

const swap = () => {
useEffect(() => toast.success("please enter amount less than 5$, amount greater than 5$ will be lost forever"))  

return (
    <Main
      meta={
        <Meta
          title="Swap - Fetcch"
          description="Seamless Crosschain Swapping"
        />
      }
    >
      <div className="h-full w-full bg-gradient-to-r from-[#EADFFF] to-[#FFECD3] dark:bg-gradient-to-r dark:from-fetcch-dark dark:to-fetcch-dark/10">
        <Header />
        <Swap />
      </div>
    </Main>
  );
};

export default swap;
