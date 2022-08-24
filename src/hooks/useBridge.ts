import { coins } from '@/components/swap/SwapCard';
import type { Coin } from '@/types';
import { BigNumber, ethers } from 'ethers';

interface Return {
  fees: number;
  amountOut: number;
}

const abi = [{ "inputs": [{ "internalType": "address", "name": "_pool", "type": "address" }, { "internalType": "address", "name": "_dex", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_dex", "type": "address" }], "name": "changeDex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pool", "type": "address" }], "name": "changePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "dex", "outputs": [{ "internalType": "contract UniV2Provider", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pool", "outputs": [{ "internalType": "contract FetcchPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "_fromToken", "type": "address" }, { "internalType": "address", "name": "_toToken", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "dexRequired", "type": "bool" }, { "internalType": "uint256", "name": "_amountOut", "type": "uint256" }], "internalType": "struct FetcchBridge.fromChainData", "name": "_fromChain", "type": "tuple" }, { "components": [{ "internalType": "address", "name": "_fromToken", "type": "address" }, { "internalType": "address", "name": "_toToken", "type": "address" }, { "internalType": "bytes", "name": "_destination", "type": "bytes" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "dexRequired", "type": "bool" }], "internalType": "struct FetcchBridge.toChainData", "name": "_toChain", "type": "tuple" }, { "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint16", "name": "_toChainID", "type": "uint16" }], "internalType": "struct FetcchBridge.swapData", "name": "_swapData", "type": "tuple" }], "name": "swap", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export const useBridge = () => {
  const bridgeTokens: any = ["USDC", "USDT"];

	const swapFunds = async (from_token: Coin, to_token: Coin, amount: string, amountOut: string, receiver: string, signer: ethers.Signer) => {
		try {
			amount = ethers.utils.parseUnits(amount, from_token.decimals).toString()
			const fromDexRequired = from_token.name.startsWith('USD')
			const toDexRequired = to_token.name.startsWith('USD')
			
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
				coins[to_token.lchainId.toString()][0].address,
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
					'0x78041397C9A35680D27F28b077704302f23017fc',
					amount
				)
				await approveTx.wait()
				console.log(approveTx)
			}

			const bridge: any = {
				'4': '0x3ed0b37306d35Dd4030717be765f1cC09077677e',
				'80001': '0x55CF82C8Eb55072A803668Fa0Ef43B45b26Fc2B3',
				'97': '0x78041397C9A35680D27F28b077704302f23017fc'
			}
			console.log(bridge[from_token.lchainId])
			
			const contract = new ethers.Contract(bridge[from_token.lchainId], abi, signer)

			const swapData2 = [
				[
					"0x0F1B31723aB54D45aFd80D94542677881d524d8F",
					"0x0F1B31723aB54D45aFd80D94542677881d524d8F",
					ethers.utils.parseEther('200'),
					false,
					0
				],
				[
					"0x925e9A45C2B576D6AE81d0C4fD57241c7B7364Ed",
					"0x925e9A45C2B576D6AE81d0C4fD57241c7B7364Ed",
					"0x6a65F7aC9d20412c188883Ae229a6798c5cEf29e",
					ethers.utils.parseEther("198"),
					false
				],
				"0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
				10009
			]

			const tx = await contract.swap(swapData2, { value: ethers.utils.parseEther(from_token.lchainId === 97 ? '0.001' : from_token.lchainId === 80001 ? '3' : '0.2'), gasPrice: signer.provider?.getGasPrice(), gasLimit: 15000000 })

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

		console.log(fromChainDexRequired, toChainDexRequired)

    const fees: Return = {
      fees: 0,
      amountOut: amount,
    };

		if (fromToken.name.startsWith('USD') || (fromToken.name.startsWith('W') && toToken.name.startsWith('W'))) {
			const point1Percent = amount * 0.001
	
			fees.fees += point1Percent
			fees.amountOut -= point1Percent
		} else {
			const point1Percent = (amount*1000) * 0.001
	
			fees.fees += point1Percent
			fees.amountOut -= point1Percent
		}

    if (fromChainDexRequired) {
			let point3Percent = amount;
			if ((fromToken.name.startsWith('USD') && toToken.name.startsWith('USD')) || (fromToken.name.startsWith('W') && toToken.name.startsWith('W'))) {
				point3Percent = amount * 0.003;
				fees.fees += point3Percent;
				fees.amountOut -= point3Percent;
			} else {
				point3Percent = (amount*1000) * 0.003;
				fees.fees += point3Percent;
				fees.amountOut = (amount * 1000) - point3Percent;
				console.log((amount * 1000))
			}

    }

    if (toChainDexRequired) {
			let point3Percent = amount;
			console.log(fromToken.name, toToken.name)
			if ((fromToken.name.startsWith('USD') && toToken.name.startsWith('USD')) || (fromToken.name.startsWith('W') && toToken.name.startsWith('W'))) {
				point3Percent = amount * 0.003;
				fees.fees += point3Percent;
				fees.amountOut -= point3Percent;
			} else {
				point3Percent = (amount * 1000) * 0.003;
				fees.fees += point3Percent;
				fees.amountOut = (amount * 1000) - point3Percent;
			}

    }

    console.log(fees);

    return fees;
  };

  return {
    estimateFees,
		swapFunds
  };
};
