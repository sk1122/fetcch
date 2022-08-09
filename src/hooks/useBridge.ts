import { coins } from '@/components/swap/SwapCard';
import type { Coin } from '@/types';
import { BigNumber, ethers } from 'ethers';

interface Return {
  fees: number;
  amountOut: number;
}

const abi = [{ "inputs": [{ "internalType": "address", "name": "_pool", "type": "address" }, { "internalType": "address", "name": "_dex", "type": "address" }, { "internalType": "address", "name": "_dst", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "destination", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "dex", "outputs": [{ "internalType": "contract UniV2Provider", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pool", "outputs": [{ "internalType": "contract FetcchPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "_fromToken", "type": "address" }, { "internalType": "address", "name": "_toToken", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "dexRequired", "type": "bool" }, { "internalType": "uint256", "name": "_amountOut", "type": "uint256" }], "internalType": "struct FetcchBridge.fromChainData", "name": "_fromChain", "type": "tuple" }, { "components": [{ "internalType": "address", "name": "_fromToken", "type": "address" }, { "internalType": "address", "name": "_toToken", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "dexRequired", "type": "bool" }], "internalType": "struct FetcchBridge.toChainData", "name": "_toChain", "type": "tuple" }, { "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint16", "name": "_toChainID", "type": "uint16" }], "internalType": "struct FetcchBridge.swapData", "name": "_swapData", "type": "tuple" }], "name": "swap", "outputs": [], "stateMutability": "payable", "type": "function" }]

export const useBridge = () => {
  const bridgeTokens: any = [];

	const swapFunds = async (from_token: Coin, to_token: Coin, amount: string, amountOut: string, receiver: string, signer: ethers.Signer) => {
		try {
			amount = ethers.utils.parseUnits(amount, from_token.decimals).toString()
			const fromDexRequired = from_token.name !== 'USDC'
			const toDexRequired = to_token.name !== 'USDC'
			console.log(from_token.lchainId, "Fa")
			// @ts-ignore
			console.log(coins[from_token.lchainId.toString()][0],)
			const fromChainData = [
				from_token.address,
				// @ts-ignore
				coins[from_token.lchainId.toString()][0].address,
				BigNumber.from(amount),
				fromDexRequired,
				BigNumber.from(amountOut)
			]
			
			const toChainData = [
				// @ts-ignore
				coins[from_token.lchainId.toString()][0].address,
				to_token.address,
				BigNumber.from(amountOut),
				toDexRequired
			]

			const swapData = [
				fromChainData,
				toChainData,
				receiver,
				to_token.chainId
			]

			if (from_token.address.toLowerCase !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
				const ERC20abi = [
					"function approve(address _spender, uint256 _value) public returns (bool success)",
				];
				let erc20contract = new ethers.Contract(
					from_token.address,
					ERC20abi,
					signer
				)
				console.log(amount, "amount")
				let approveTx = await erc20contract.approve(
					'0xd9b4bCCD76E4c35AFa4b473af723fBb19B3E65e8',
					amount
				)
				console.log(approveTx)
			}

			const contract = new ethers.Contract('0xd9b4bCCD76E4c35AFa4b473af723fBb19B3E65e8', abi, signer)

			const value = from_token.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ? BigNumber.from(amount) : 0

			const tx = await contract.swap(swapData, { value: value })

			return tx
		} catch(e) {
			console.error(e)
		}
	}

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
		swapFunds
  };
};
