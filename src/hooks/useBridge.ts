import type { Coin } from '@/types';

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

    console.log(fees);

    return fees;
  };

  return {
    estimateFees,
  };
};
