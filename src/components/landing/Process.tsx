import React from 'react';

import { BridgeIcon } from '@/icons/bridgeIcon';
import { ChangeIcon } from '@/icons/changeIcon';
import { LinkIcon } from '@/icons/link';

import ProcessCard from './ProcessCard';

const processCards = [
  {
    title: 'Chain & token selection',
    description:
      'Select the chains and tokens you want to swap from your Choose your coins list.',
    icon: <LinkIcon />,
  },
  {
    title: 'Auto-Bridge selection',
    description:
      "By default, the bridge is set to automatically So that you won't have to think much based on your fees or time preference.Also can be done manually So that you can select more advanced options during bridge selection.",
    icon: <BridgeIcon />,
  },
  {
    title: 'Actual swapping',
    description:
      'Swapping on the blockchain is done properly, safely, and transparently with your choice of options and you can track the transaction from our Ul or with SDK',
    icon: <ChangeIcon />,
  },
];

const Process = () => {
  return (
    <section className="mx-auto mb-20 flex min-h-[90vh] max-w-8xl flex-col items-center">
      <h2 className="mx-auto mb-20 w-full text-center text-4xl font-bold md:mb-32">
        Our Process
      </h2>
      <div className="grid w-full grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-0">
        {/* <div className="h-96 w-full border border-black">1</div>
        <div className="h-96 w-full border border-black">2</div>
        <div className="h-96 w-full border border-black">3</div> */}
        {processCards.map((card) => (
          <ProcessCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Process;
