import type { TokenInterface } from '@/contexts/AppContext';

const Token = ({ name, logoURI }: TokenInterface) => {
  return (
    <>
      <div className="flex w-full items-center space-x-2 bg-[#353434] p-2 text-xl">
        <img src={logoURI} className=" mr-1 h-6 w-6 rounded-full" alt="" />
        <p className="text-sm">{name}</p>
      </div>
    </>
  );
};

export default Token;
