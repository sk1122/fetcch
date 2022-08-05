import type { ReactNode } from 'react';

import Header from '@/components/Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased dark:text-white">
    {props.meta}

    <Header />
    <div className="mx-auto">
      <div>{props.children}</div>
    </div>
  </div>
);

export { Main };
