import {  TokenInterface } from "../swap/SwapCard";

const Token = ({ name, logoURI }: TokenInterface) => {
  return (
    <>
      <div className="flex w-full items-center space-x-2 bg-fetcch-dark/50  p-2 text-xl">
        <img src={logoURI} className=" mr-1 h-6 w-6 rounded-full" alt="" />
        <p className="text-sm">{name}</p>
      </div>
    </>
  );
};

export default Token;
