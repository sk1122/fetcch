import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased dark:text-white">
    {props.meta}

    <div className="mx-auto">
      <div>{props.children}</div>
    </div>
  </div>
);

export { Main };
