import type { Coin } from '@/types';
import { BigNumber, ethers } from 'ethers';
import { Chain, getTokenByName, Token } from 'fetcch-chain-data';
import { chainId } from 'wagmi';

interface Return {
  fees: string;
  amountInTokens: string;
}

const abi = [{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_dex","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_dex","type":"address"}],"name":"changeDex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"changePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dex","outputs":[{"internalType":"contract UniV2Provider","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_fromChainID","type":"uint16"},{"internalType":"uint16","name":"_toChainID","type":"uint16"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract FetcchPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddr","type":"address"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"_refundAd","type":"address"},{"components":[{"internalType":"address","name":"_fromToken","type":"address"},{"internalType":"address","name":"_toToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"dexRequired","type":"bool"}],"internalType":"struct FetcchBridge.fromChainData","name":"_fromChain","type":"tuple"},{"components":[{"internalType":"address","name":"_fromToken","type":"address"},{"internalType":"address","name":"_toToken","type":"address"},{"internalType":"bytes","name":"_destination","type":"bytes"},{"internalType":"bool","name":"dexRequired","type":"bool"}],"internalType":"struct FetcchBridge.toChainData","name":"_toChain","type":"tuple"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint16","name":"_fromChainID","type":"uint16"},{"internalType":"uint16","name":"_toChainID","type":"uint16"}],"internalType":"struct FetcchBridge.swapData","name":"_swapData","type":"tuple"}],"name":"swap","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export const useBridge = () => {


  const swap = async(receiver: string, fromChain: Chain, toChain: Chain, fromToken: any, toToken: any, amount: string, signer: ethers.Signer) => {

    // LZ BSC -> 0xD187329cEAe8F0f08d7fbb51444ac301B0908616
    // LZ Polygon -> 0x6fB5dd7f24E6B85E7e8019C40b9E628B0BA86EE0

    // Bridge BSC -> 0xEF16C64E352b97518958Ae9C3D81a5d53c602F0B
    // Bridge Polygon -> 0x423e25c00eA0fDD65a9dC104dD7996842e66d94e

	const addr2: any = {
		'137': '0x6fB5dd7f24E6B85E7e8019C40b9E628B0BA86EE0',
		'56': '0xD187329cEAe8F0f08d7fbb51444ac301B0908616'
	}

	const addresses: any = {
		'137': '0x423e25c00eA0fDD65a9dC104dD7996842e66d94e',
		'56': '0xEF16C64E352b97518958Ae9C3D81a5d53c602F0B'
	}
	
	const lzId: any = {
		'137': 109,
		'56': 102
	}

  //remoteAdr -> toChain lz impl address
	//localAdr -> fromChain lz impl address
	//const destination = ethers.utils.solidityPack(["address", "address"], [remoteAdr, localAdr]);
	const destination = ethers.utils.solidityPack(["address", "address"], [addr2[toChain.chainId], addr2[fromChain.chainId]]);

    const contract = new ethers.Contract(addresses[fromChain.chainId], abi, signer);
	console.log(fromToken, toToken)
    const swapdata: any[] = [
      await signer.getAddress(),
      [
        fromToken.address,
        fromChain.internalId === 3 ? getTokenByName('BUSD', '3').address : getTokenByName('USDC', fromChain.internalId.toString()).address,
        amount,
        !(fromToken.symbol === 'USDC' || fromToken.symbol === 'BUSD')
      ],
      [
        toToken.address,
        toChain.internalId === 3 ? getTokenByName('BUSD', '3').address : getTokenByName('USDC', toChain.internalId.toString()).address,
        destination,
        !(toToken.symbol === 'USDC' || toToken.symbol === 'BUSD')
      ],
      receiver,
      lzId[fromChain.chainId],
      lzId[toChain.chainId]
    ]

    console.log(signer)

    console.log(contract.address, "contract")

	console.log(swapdata, "swapData")

    const tx = await contract.swap(swapdata, {value: ethers.utils.parseEther(fromChain.internalId === 3 ? '0.01' : fromChain.internalId === 2 ? '2' : '0'), gasPrice: signer.provider?.getGasPrice(), gasLimit: 15000000});
    await tx;
  }

  // const estimateFees = async (
  //   fromToken: Coin,
  //   toToken: Coin,
  //   amount: number
  // ): Promise<Return> => {
	// const bridgeTokens: any = ["USDC", "USDT"];
  //   let fromChainDexRequired = false;
  //   let toChainDexRequired = false;

  //   if (!bridgeTokens.includes(fromToken.name)) fromChainDexRequired = true;
  //   if (!bridgeTokens.includes(toToken.name)) toChainDexRequired = true;

	// 	console.log(fromChainDexRequired, toChainDexRequired)

  //   const fees: Return = {
  //     fees: 0,
  //     amountOut: amount,
  //   };

	// 	if (fromToken.name.startsWith('USD') || (fromToken.name.startsWith('W') && toToken.name.startsWith('W'))) {
	// 		const point1Percent = amount * 0.001
	
	// 		fees.fees += point1Percent
	// 		fees.amountOut -= point1Percent
	// 	} else {
	// 		const point1Percent = (amount*1000) * 0.001
	
	// 		fees.fees += point1Percent
	// 		fees.amountOut -= point1Percent
	// 	}

  //   if (fromChainDexRequired) {
	// 		let point3Percent = amount;
	// 		if ((fromToken.name.startsWith('USD') && toToken.name.startsWith('USD')) || (fromToken.name.startsWith('W') && toToken.name.startsWith('W'))) {
	// 			point3Percent = amount * 0.003;
	// 			fees.fees += point3Percent;
	// 			fees.amountOut -= point3Percent;
	// 		} else {
	// 			point3Percent = (amount*1000) * 0.003;
	// 			fees.fees += point3Percent;
	// 			fees.amountOut = (amount * 1000) - point3Percent;
	// 			console.log((amount * 1000))
	// 		}

  //   }

  //   if (toChainDexRequired) {
	// 		let point3Percent = amount;
	// 		console.log(fromToken.name, toToken.name)
	// 		if ((fromToken.name.startsWith('USD') && toToken.name.startsWith('USD')) || (fromToken.name.startsWith('W') && toToken.name.startsWith('W'))) {
	// 			point3Percent = amount * 0.003;
	// 			fees.fees += point3Percent;
	// 			fees.amountOut -= point3Percent;
	// 		} else {
	// 			point3Percent = (amount * 1000) * 0.003;
	// 			fees.fees += point3Percent;
	// 			fees.amountOut = (amount * 1000) - point3Percent;
	// 		}

  //   }

  //   // console.log(fees);

  //   return fees;
  // };

  const estimateAmountOut = async (
    fromChain: Chain,
    toChain: Chain,
    fromToken: any,
    toToken: any,
    amount: string
  ): Promise<Return> =>{
    const bridgeTokens: any = ["USDC", "USDT","BUSD"];
    let fromChainDexRequired = false;
    let toChainDexRequired = false;

    if (!bridgeTokens.includes(fromToken.symbol)) fromChainDexRequired = true;
    if (!bridgeTokens.includes(toToken.symbol)) toChainDexRequired = true;

    const fromStable = fromChain.internalId === 3 ? getTokenByName('BUSD', '3') : getTokenByName('USDC', fromChain.internalId.toString())
    const toStable = toChain.internalId === 3 ? getTokenByName('BUSD', '3') : getTokenByName('USDC', toChain.internalId.toString())
    
    const amounts: Return = {
      fees: '0',
      amountInTokens: amount
    };

    if(fromChainDexRequired) {
      const res = await fetch(
        `https://api.1inch.exchange/v4.0/${fromChain.chainId}/quote?fromTokenAddress=${fromToken.address.toLowerCase()}&toTokenAddress=${fromStable.address.toLowerCase()}&amount=${amount}`
      )
      const data = await res.json()

      console.log(data.toTokenAmount)

      amounts.amountInTokens = data.toTokenAmount

      console.log(amounts)
    }

    console.log(fromStable.decimals, toStable)

    if(toChainDexRequired) {
      amounts.fees = (Number(ethers.utils.formatUnits(amounts.amountInTokens, fromStable.decimals)) * 0.001).toFixed(0)
      amounts.amountInTokens = BigNumber.from(amounts.amountInTokens).sub(ethers.utils.parseUnits(amounts.fees, fromStable.decimals)).toString()
      console.log(ethers.utils.parseUnits(Number(ethers.utils.formatUnits(amounts.amountInTokens, fromStable.decimals)).toFixed(0), toStable.decimals).toString())
      const res = await fetch(
        `https://api.1inch.exchange/v4.0/${toChain.chainId}/quote?fromTokenAddress=${toStable.address.toLowerCase()}&toTokenAddress=${toToken.address.toLowerCase()}&amount=${ethers.utils.parseUnits(Number(ethers.utils.formatUnits(amounts.amountInTokens, fromStable.decimals)).toFixed(0), toStable.decimals).toString()}`
      )

      const data = await res.json()

      console.log(amounts, data)

      amounts.amountInTokens = ethers.utils.formatUnits(data.toTokenAmount, data.toToken.decimals)
    } else {
      console.log(amounts)
      amounts.fees = (Number(ethers.utils.formatUnits(amounts.amountInTokens, fromStable.decimals)) * 0.001).toFixed(0)
      amounts.amountInTokens = BigNumber.from(amounts.amountInTokens).sub(ethers.utils.parseUnits(amounts.fees, fromStable.decimals)).toString()

      amounts.amountInTokens = ethers.utils.formatUnits(amounts.amountInTokens, fromStable.decimals)

      return amounts
    }

    return amounts
  }


  return {
    swap,
    estimateAmountOut
  };
}
