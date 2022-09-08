import type { Coin } from '@/types';
import { ethers, Signer } from 'ethers';

interface Return {
  fees: number;
  amountOut: number;
}

export const useBridge = () => {
  const bridgeTokens: any = [];

  const estimateFees = async (
    fromToken: Coin,
    toToken: Coin,
    amount: number
  ): Promise<Return> => {
    let fromChainDexRequired = false;
    let toChainDexRequired = false;

    if (!bridgeTokens.includes(fromToken.name)) fromChainDexRequired = true;
    if (!bridgeTokens.includes(toToken.name)) toChainDexRequired = true;

    const fees: Return = {
      fees: 0,
      amountOut: amount,
    };

    if (fromChainDexRequired) {
      const point3Percent = amount * 0.003;

      fees.fees += point3Percent;
      fees.amountOut -= point3Percent;
    }

    if (toChainDexRequired) {
      const point3Percent = amount * 0.003;
      fees.fees += point3Percent;
      fees.amountOut -= point3Percent;
    }

    // console.log(fees);

    return fees;
  };

  const swap = async() => {

    // LZ BSC -> 0xD187329cEAe8F0f08d7fbb51444ac301B0908616
    // LZ Polygon -> 0x6fB5dd7f24E6B85E7e8019C40b9E628B0BA86EE0

    // Bridge BSC -> 0xEF16C64E352b97518958Ae9C3D81a5d53c602F0B
    // Bridge Polygon -> 0x423e25c00eA0fDD65a9dC104dD7996842e66d94e

    const contract = new ethers.Contract(//address, abi, signer);

    const swapdata = [
      //refund address,
      [
        //from token,
        //to token (USDC/BUSD),
        //amount,
        //dex required (true/false)
      ],
      [
        //from token (USDC/BUSD),
        //to token,
        //destination (layerzero implementation on toChain),
        //dex required (true/false)
      ],
      //receiver,
      //fromChain id
      //toChain id
    ]

    const tx = await contract.swap(swapdata, {value: ethers.utils.parseEther(fromChain === BSC ? '0.01' : fromChain === POLY ? '2'), gasPrice: signer.provider?.getGasPrice(), gasLimit: 15000000});
    await tx;
  }

  return {
    swap,
    estimateFees,
  };
};
