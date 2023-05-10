import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { Chain } from "fetcch-chain-data";
import { checkAndGetApproval } from "./approval";

const INCH1_ABI = [
  {
    inputs: [
      { internalType: "address", name: "weth", type: "address" },
      {
        internalType: "contract IClipperExchangeInterface",
        name: "_clipperExchange",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "makingAmount",
        type: "uint256",
      },
    ],
    name: "OrderFilledRFQ",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIMIT_ORDER_RFQ_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "orderInfo", type: "uint256" }],
    name: "cancelOrderRFQ",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "contract IERC20", name: "dstToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
    ],
    name: "clipperSwap",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "contract IERC20", name: "dstToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
    ],
    name: "clipperSwapTo",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "contract IERC20", name: "dstToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
      { internalType: "bytes", name: "permit", type: "bytes" },
    ],
    name: "clipperSwapToWithPermit",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "destroy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "info", type: "uint256" },
          {
            internalType: "contract IERC20",
            name: "makerAsset",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "takerAsset",
            type: "address",
          },
          { internalType: "address", name: "maker", type: "address" },
          { internalType: "address", name: "allowedSender", type: "address" },
          { internalType: "uint256", name: "makingAmount", type: "uint256" },
          { internalType: "uint256", name: "takingAmount", type: "uint256" },
        ],
        internalType: "struct LimitOrderProtocolRFQ.OrderRFQ",
        name: "order",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "uint256", name: "makingAmount", type: "uint256" },
      { internalType: "uint256", name: "takingAmount", type: "uint256" },
    ],
    name: "fillOrderRFQ",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "info", type: "uint256" },
          {
            internalType: "contract IERC20",
            name: "makerAsset",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "takerAsset",
            type: "address",
          },
          { internalType: "address", name: "maker", type: "address" },
          { internalType: "address", name: "allowedSender", type: "address" },
          { internalType: "uint256", name: "makingAmount", type: "uint256" },
          { internalType: "uint256", name: "takingAmount", type: "uint256" },
        ],
        internalType: "struct LimitOrderProtocolRFQ.OrderRFQ",
        name: "order",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "uint256", name: "makingAmount", type: "uint256" },
      { internalType: "uint256", name: "takingAmount", type: "uint256" },
      { internalType: "address payable", name: "target", type: "address" },
    ],
    name: "fillOrderRFQTo",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "info", type: "uint256" },
          {
            internalType: "contract IERC20",
            name: "makerAsset",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "takerAsset",
            type: "address",
          },
          { internalType: "address", name: "maker", type: "address" },
          { internalType: "address", name: "allowedSender", type: "address" },
          { internalType: "uint256", name: "makingAmount", type: "uint256" },
          { internalType: "uint256", name: "takingAmount", type: "uint256" },
        ],
        internalType: "struct LimitOrderProtocolRFQ.OrderRFQ",
        name: "order",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "uint256", name: "makingAmount", type: "uint256" },
      { internalType: "uint256", name: "takingAmount", type: "uint256" },
      { internalType: "address payable", name: "target", type: "address" },
      { internalType: "bytes", name: "permit", type: "bytes" },
    ],
    name: "fillOrderRFQToWithPermit",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "maker", type: "address" },
      { internalType: "uint256", name: "slot", type: "uint256" },
    ],
    name: "invalidatorForOrderRFQ",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "rescueFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAggregationExecutor",
        name: "caller",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "srcToken",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "dstToken",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "srcReceiver",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "dstReceiver",
            type: "address",
          },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "minReturnAmount", type: "uint256" },
          { internalType: "uint256", name: "flags", type: "uint256" },
          { internalType: "bytes", name: "permit", type: "bytes" },
        ],
        internalType: "struct AggregationRouterV4.SwapDescription",
        name: "desc",
        type: "tuple",
      },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
      { internalType: "uint256", name: "spentAmount", type: "uint256" },
      { internalType: "uint256", name: "gasLeft", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
      { internalType: "uint256[]", name: "pools", type: "uint256[]" },
    ],
    name: "uniswapV3Swap",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "uniswapV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
      { internalType: "uint256[]", name: "pools", type: "uint256[]" },
    ],
    name: "uniswapV3SwapTo",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
      { internalType: "uint256[]", name: "pools", type: "uint256[]" },
      { internalType: "bytes", name: "permit", type: "bytes" },
    ],
    name: "uniswapV3SwapToWithPermit",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
      { internalType: "bytes32[]", name: "pools", type: "bytes32[]" },
    ],
    name: "unoswap",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "minReturn", type: "uint256" },
      { internalType: "bytes32[]", name: "pools", type: "bytes32[]" },
      { internalType: "bytes", name: "permit", type: "bytes" },
    ],
    name: "unoswapWithPermit",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

interface Inch1Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

interface Inch1Params {
  fromChainId: string;
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromAddress: string;
  destReceiver: string;
  slippage: string;
}

interface Inch1Response {
  tx: ethers.Transaction;
  toToken: Inch1Token;
  fromToken: Inch1Token;
  toTokenAmount: string;
  fromTokenAmount: string;
}

export const get1InchTxData = async ({
  fromChainId,
  fromAddress,
  fromTokenAddress,
  toTokenAddress,
  destReceiver,
  amount,
  slippage,
}: Inch1Params): Promise<Inch1Response | undefined> => {
  try {
    const res = await axios({
      url: `https://api.1inch.io/v4.0/${fromChainId}/swap`,
      params: {
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress,
        destReceiver,
        slippage,
        compatibilityMode: true,
        disableEstimate: true,
      },
    });

    const data = await res.data;

    return data;
  } catch (e) {
    console.log(e);

    return undefined;
  }
};

interface QuoteApiParams {
  fromChain: Chain;
  toChain: Chain;
  fromToken: Inch1Token;
  toToken: Inch1Token;
  amount: string;
}

interface Return {
  fees: string;
  amountOut: string;
}

export const getQuote = async ({
  fromChain,
  fromToken,
  toChain,
  toToken,
  amount
}: QuoteApiParams) => {
  // const bridgeTokens: any = ["USDC", "USDT", "BUSD", "FTST"];
  const stables: any = {
    "56": {
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
    },
    "43114": {
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      decimals: 6,
    },
  };
  
  let fromChainDexRequired = false;
  let toChainDexRequired = false;

  if (stables[fromChain.chainId].address.toLowerCase() !== fromToken.address.toLowerCase()) fromChainDexRequired = true;
  if (
    stables[toChain.chainId].address.toLowerCase() !==
    toToken.address.toLowerCase()
  )
    toChainDexRequired = true;
  console.log(fromChainDexRequired, toChainDexRequired);

  const fromStable =
    fromChain.internalId === 3
      ? stables["56"]
      : stables["43114"]
  const toStable =
    toChain.internalId === 3 ? stables["56"] : stables["43114"];

  const amounts: Return = {
    fees: "0",
    amountOut: amount,
  };

  if (fromChainDexRequired) {
    const res = await fetch(
      `https://api.1inch.exchange/v4.0/${
        fromChain.chainId
      }/quote?fromTokenAddress=${fromToken.address.toLowerCase()}&toTokenAddress=${fromStable.address.toLowerCase()}&amount=${amount}`
    );
    const data = await res.json();

    console.log(data.toTokenAmount);

    amounts.amountOut = data.toTokenAmount;
    amounts.fees = (
      Number(ethers.utils.formatUnits(amounts.amountOut, fromStable.decimals)) *
      0.001
    ).toFixed(0);

    console.log(amounts);
  }

  console.log(fromStable.decimals, toStable);

  if (toChainDexRequired) {
    amounts.fees = (
      Number(ethers.utils.formatUnits(amounts.amountOut, fromStable.decimals)) *
      0.001
    ).toFixed(0);
    amounts.amountOut = BigNumber.from(amounts.amountOut)
      .sub(ethers.utils.parseUnits(amounts.fees, fromStable.decimals))
      .toString();
    console.log(
      ethers.utils
        .parseUnits(
          Number(
            ethers.utils.formatUnits(amounts.amountOut, fromStable.decimals)
          ).toFixed(0),
          toStable.decimals
        )
        .toString()
    );
    const res = await fetch(
      `https://api.1inch.exchange/v4.0/${
        toChain.chainId
      }/quote?fromTokenAddress=${toStable.address.toLowerCase()}&toTokenAddress=${toToken.address.toLowerCase()}&amount=${ethers.utils
        .parseUnits(
          Number(
            ethers.utils.formatUnits(amounts.amountOut, fromStable.decimals)
          ).toFixed(0),
          toStable.decimals
        )
        .toString()}`
    );

    const data = await res.json();

    console.log(amounts, data);

    amounts.amountOut = ethers.utils.formatUnits(
      data.toTokenAmount,
      data.toToken.decimals
    );
  } else {
    console.log(amounts);
    amounts.fees = (
      Number(ethers.utils.formatUnits(amounts.amountOut, fromStable.decimals)) *
      0.001
    ).toFixed(0);
    amounts.amountOut = BigNumber.from(amounts.amountOut)
      .sub(ethers.utils.parseUnits(amounts.fees, fromStable.decimals))
      .toString();

    amounts.amountOut = ethers.utils.formatUnits(
      amounts.amountOut,
      fromStable.decimals
    );

    return amounts;
  }

  return amounts;
};

interface SwapParams {
  receiver: string
  fromChain: Chain
  toChain: Chain
  fromToken: Inch1Token,
  toToken: Inch1Token,
  amount: string
  signer: ethers.Signer
}

export const swapFunds = async ({
  receiver,
  fromChain,
  toChain,
  fromToken,
  toToken,
  amount,
  signer
}: SwapParams) => {
  try {
    const destinationAxelar: any = {
      43114: "0xF11909835205f3387E6b012aD53CCd99D42151d8",
      56: "0x75B8b44b06882144E6383aaBDd4771ed76f2E5dE",
    };
    
    const stables: any = {
      "56": {
        address: "0x55d398326f99059fF775485246999027B3197955",
        decimals: 18,
      },
      "43114": {
        address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
        decimals: 6,
      },
    };

    // const destinationLZ: any = {
    //   43114: "0x176001Bcaa2175D625CcEb1F2802086C64696Ee3",
    //   56: "0xacd3538e02814D548DF75f0C3d8e2798dd4fE003",
    // };
    
    const bridge: any = {
      56: "0x176Ad9443CaBb1fD4FFFC867FD54656fC05E7bac",
      43114: "0x94ACf82AFbB2b059575f022a32641FC2954Fa3A0",
    };

    // const lzId: any = {
    //   56: "102",
    //   43114: "106",
    // };

    const axelarId: any = {
      56: "binance",
      43114: "Avalanche",
    };

    const messagingId: any = {
      43114: {
        lz: 2,
        axelar: 3,
      },
      56: {
        lz: 1,
        axelar: 2,
      },
    };
    
    const fromAddress = await signer.getAddress()

    const fromDexData = await get1InchTxData({
      fromChainId: fromChain.chainId.toString(),
      fromAddress: fromAddress,
      destReceiver: bridge[fromChain.chainId],
      fromTokenAddress: fromToken.address,
      toTokenAddress:
        stables[fromChain.chainId].address.toLowerCase() ===
        fromToken.address.toLowerCase()
          ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          : stables[fromChain.chainId].address.toLowerCase(),
      amount,
      slippage: "1",
    });

    if (!fromDexData) throw new Error("Error in getting dex data");
    
    let stableCoinAmount =
      stables[fromChain.chainId].address.toLowerCase() ===
      fromToken.address.toLowerCase()
        ? toChain.chainId === 56
          ? ethers.utils.parseUnits(amount, 12).toString()
          : ethers.utils.formatUnits(amount, 12).toString()
        : fromDexData.toTokenAmount;

    console.log(
      (Number(stableCoinAmount) - (Number(stableCoinAmount) * 0.001)).toFixed(2), stableCoinAmount
    );
    const toDexData = await get1InchTxData({
      fromChainId: toChain.chainId.toString(),
      fromAddress: bridge[toChain.chainId],
      destReceiver: receiver,
      fromTokenAddress: stables[toChain.chainId].address.toLowerCase() !== toTokenAddress.toLowerCase() ? stables[toChain.chainId].address.toLowerCase() : toToken.address.toLowerCase() === toTokenAddress.toLowerCase() ? stables[toChain.chainId].address.toLowerCase() : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      toTokenAddress: toToken.address,
      amount: (
        Number(stableCoinAmount) -
        (Number(stableCoinAmount) * 0.001)
      ).toFixed(0),
      slippage: "1",
    });

    if (!toDexData) throw new Error("Error in getting dex data");
  
    const iface = new ethers.utils.Interface(INCH1_ABI)

    const fromDexDecodedData = iface.decodeFunctionData("swap", fromDexData.tx.data)
    const toDexDecodedData = iface.decodeFunctionData("swap", toDexData.tx.data)

    // let extraParamsLZ = ethers.utils.solidityPack([
    //   "uint16",
    //   "address",
    //   "bytes"
    // ], [
    //   lzId[toChain.chainId],
    //   fromAddress,
    //   "0x"
    // ])

    const abi = ethers.utils.defaultAbiCoder

    let extraParamsAxelar = abi.encode(["string"], [axelarId[toChain.chainId]]);

    console.log(fromDexDecodedData, toDexDecodedData)

    let params = [
      [
        fromToken.address,
        stables[fromChain.chainId].address,
        amount,
        extraParamsAxelar,
        messagingId[fromChain.chainId]["axelar"],
        [
          fromDexDecodedData.caller,
          [
            fromDexDecodedData.desc.srcToken,
            fromDexDecodedData.desc.dstToken,
            fromDexDecodedData.desc.srcReceiver,
            fromDexDecodedData.desc.dstReceiver,
            fromDexDecodedData.desc.amount,
            fromDexDecodedData.desc.minReturnAmount,
            fromDexDecodedData.desc.flags,
            fromDexDecodedData.desc.permit,
          ],
          fromDexDecodedData.data,
        ],
      ],
      [
        stables[toChain.chainId].address,
        toToken.address,
        destinationAxelar[toChain.chainId],
        receiver,
        [
          toDexDecodedData.caller,
          [
            toDexDecodedData.desc.srcToken,
            toDexDecodedData.desc.dstToken,
            toDexDecodedData.desc.srcReceiver,
            toDexDecodedData.desc.dstReceiver,
            toDexDecodedData.desc.amount,
            toDexDecodedData.desc.minReturnAmount,
            toDexDecodedData.desc.flags,
            toDexDecodedData.desc.permit,
          ],
          toDexDecodedData.data,
        ]
        ,
      ],
    ];

    if (
      fromToken.address.toLowerCase() !==
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ) {
      await checkAndGetApproval(bridge[fromChain.chainId], fromToken, amount, signer);
    }
    
    const contract = new ethers.Contract(
      bridge[fromChain.chainId],
      [
        {
          inputs: [{ internalType: "address", name: "_dex", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "_fromToken",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_toToken",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "_amount",
                      type: "uint256",
                    },
                    {
                      internalType: "bytes",
                      name: "_extraParams",
                      type: "bytes",
                    },
                    {
                      internalType: "uint16",
                      name: "_commLayerID",
                      type: "uint16",
                    },
                    {
                      components: [
                        {
                          internalType: "contract IAggregationExecutor",
                          name: "_executor",
                          type: "address",
                        },
                        {
                          components: [
                            {
                              internalType: "contract IERC20",
                              name: "srcToken",
                              type: "address",
                            },
                            {
                              internalType: "contract IERC20",
                              name: "dstToken",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "srcReceiver",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "dstReceiver",
                              type: "address",
                            },
                            {
                              internalType: "uint256",
                              name: "amount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "minReturnAmount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "flags",
                              type: "uint256",
                            },
                            {
                              internalType: "bytes",
                              name: "permit",
                              type: "bytes",
                            },
                          ],
                          internalType: "struct SwapDescription",
                          name: "_desc",
                          type: "tuple",
                        },
                        { internalType: "bytes", name: "_data", type: "bytes" },
                      ],
                      internalType: "struct DexData",
                      name: "_dex",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct FromChainData",
                  name: "fromChain",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "_fromToken",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_toToken",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_destination",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_receiver",
                      type: "address",
                    },
                    {
                      components: [
                        {
                          internalType: "contract IAggregationExecutor",
                          name: "_executor",
                          type: "address",
                        },
                        {
                          components: [
                            {
                              internalType: "contract IERC20",
                              name: "srcToken",
                              type: "address",
                            },
                            {
                              internalType: "contract IERC20",
                              name: "dstToken",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "srcReceiver",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "dstReceiver",
                              type: "address",
                            },
                            {
                              internalType: "uint256",
                              name: "amount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "minReturnAmount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "flags",
                              type: "uint256",
                            },
                            {
                              internalType: "bytes",
                              name: "permit",
                              type: "bytes",
                            },
                          ],
                          internalType: "struct SwapDescription",
                          name: "_desc",
                          type: "tuple",
                        },
                        { internalType: "bytes", name: "_data", type: "bytes" },
                      ],
                      internalType: "struct DexData",
                      name: "_dex",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct ToChainData",
                  name: "toChain",
                  type: "tuple",
                },
              ],
              indexed: false,
              internalType: "struct SwapData",
              name: "",
              type: "tuple",
            },
          ],
          name: "Swap",
          type: "event",
        },
        {
          inputs: [{ internalType: "address", name: "_dex", type: "address" }],
          name: "changeDex",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "dex",
          outputs: [
            {
              internalType: "contract OneInchProvider",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_fromChainID", type: "uint16" },
            { internalType: "uint16", name: "_toChainID", type: "uint16" },
          ],
          name: "getNonce",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "pools",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "tokenAddr", type: "address" },
          ],
          name: "rescueFunds",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_token", type: "address" },
            { internalType: "address", name: "_pool", type: "address" },
          ],
          name: "setPools",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "_fromToken",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_toToken",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "_amount",
                      type: "uint256",
                    },
                    {
                      internalType: "bytes",
                      name: "_extraParams",
                      type: "bytes",
                    },
                    {
                      internalType: "uint16",
                      name: "_commLayerID",
                      type: "uint16",
                    },
                    {
                      components: [
                        {
                          internalType: "contract IAggregationExecutor",
                          name: "_executor",
                          type: "address",
                        },
                        {
                          components: [
                            {
                              internalType: "contract IERC20",
                              name: "srcToken",
                              type: "address",
                            },
                            {
                              internalType: "contract IERC20",
                              name: "dstToken",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "srcReceiver",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "dstReceiver",
                              type: "address",
                            },
                            {
                              internalType: "uint256",
                              name: "amount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "minReturnAmount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "flags",
                              type: "uint256",
                            },
                            {
                              internalType: "bytes",
                              name: "permit",
                              type: "bytes",
                            },
                          ],
                          internalType: "struct SwapDescription",
                          name: "_desc",
                          type: "tuple",
                        },
                        { internalType: "bytes", name: "_data", type: "bytes" },
                      ],
                      internalType: "struct DexData",
                      name: "_dex",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct FromChainData",
                  name: "fromChain",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "_fromToken",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_toToken",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_destination",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "_receiver",
                      type: "address",
                    },
                    {
                      components: [
                        {
                          internalType: "contract IAggregationExecutor",
                          name: "_executor",
                          type: "address",
                        },
                        {
                          components: [
                            {
                              internalType: "contract IERC20",
                              name: "srcToken",
                              type: "address",
                            },
                            {
                              internalType: "contract IERC20",
                              name: "dstToken",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "srcReceiver",
                              type: "address",
                            },
                            {
                              internalType: "address payable",
                              name: "dstReceiver",
                              type: "address",
                            },
                            {
                              internalType: "uint256",
                              name: "amount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "minReturnAmount",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "flags",
                              type: "uint256",
                            },
                            {
                              internalType: "bytes",
                              name: "permit",
                              type: "bytes",
                            },
                          ],
                          internalType: "struct SwapDescription",
                          name: "_desc",
                          type: "tuple",
                        },
                        { internalType: "bytes", name: "_data", type: "bytes" },
                      ],
                      internalType: "struct DexData",
                      name: "_dex",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct ToChainData",
                  name: "toChain",
                  type: "tuple",
                },
              ],
              internalType: "struct SwapData",
              name: "swapData",
              type: "tuple",
            },
          ],
          name: "swap",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      signer
    );
    const commGas = fromChain.chainId === 56 ? ethers.utils.parseEther("0.005") : ethers.utils.parseEther("0.1")
    const value = fromToken.address.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? ethers.utils.parseEther(amount) : BigNumber.from(0)
    
    console.log(params);
    const tx = await contract.swap(params, {
      value: commGas.add(value),
      gasLimit: 1000000,
      gasPrice: await signer.provider?.getGasPrice()
    })

    await tx.wait()

    console.log(`transaction hash -> ${tx.hash}`);
    return tx.hash
  } catch (e) {
    console.log(e)
  }
}
