import type { TokenInterface } from '@/contexts/AppContext';

const CoinCaps = ({ name, logoURI }: TokenInterface) => {
  return (
    <>
      <div className="flex items-center rounded-full bg-[#353434] px-3 py-1">
        <img src={logoURI} className=" mr-1 h-5 w-5 rounded-full" alt="" />
        <p className="text-sm">{name}</p>
      </div>
    </>
  );
};

export default CoinCaps;
