import { WalletGroupIcon } from '@/icons/walletsGroup';

const Sayhello = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-start px-4 pt-20 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-center text-2xl font-bold lg:mb-20 lg:text-4xl">
        Say hello to hassle free bridge selction for <br />
        <span className="text-fetcch-mustard">crosschain</span>&nbsp;
        <span className="text-fetcch-purple">swapping</span>
      </h2>
      <div className="w-full max-w-4xl">
        <WalletGroupIcon />
      </div>
    </div>
  );
};

export default Sayhello;
