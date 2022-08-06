import Link from 'next/link';
import React from 'react';

import { Swap } from '@/icons/swap';

const SwapButton = ({ classes }: { classes: string }) => {
  return (
    <Link href="/swap">
      <a
        className={`btn-tilt flex items-center space-x-2 rounded-md bg-fetcch-purple font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-fetcch-purple/50 ${classes}`}
      >
        <span>Swap here</span>
        <Swap />
      </a>
    </Link>
  );
};

export default SwapButton;
