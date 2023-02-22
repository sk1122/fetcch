import {ethers} from "ethers";
import {Biconomy} from "@biconomy/mexa";
import {ExternalProvider} from "@ethersproject/providers";

export const GaslessTxn = async (contractAddress: string, swapData: any) => {
    const abi =[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_dex",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_trustedForwarder",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "_fromToken",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_toToken",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "_extraParams",
                    "type": "bytes"
                  },
                  {
                    "internalType": "uint16",
                    "name": "_commLayerID",
                    "type": "uint16"
                  },
                  {
                    "components": [
                      {
                        "internalType": "contract IAggregationExecutor",
                        "name": "_executor",
                        "type": "address"
                      },
                      {
                        "components": [
                          {
                            "internalType": "contract IERC20",
                            "name": "srcToken",
                            "type": "address"
                          },
                          {
                            "internalType": "contract IERC20",
                            "name": "dstToken",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "srcReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "dstReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "minReturnAmount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "flags",
                            "type": "uint256"
                          },
                          {
                            "internalType": "bytes",
                            "name": "permit",
                            "type": "bytes"
                          }
                        ],
                        "internalType": "struct SwapDescription",
                        "name": "_desc",
                        "type": "tuple"
                      },
                      {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                      }
                    ],
                    "internalType": "struct DexData",
                    "name": "_dex",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct FromChainData",
                "name": "fromChain",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "_fromToken",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_toToken",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_destination",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                  },
                  {
                    "components": [
                      {
                        "internalType": "contract IAggregationExecutor",
                        "name": "_executor",
                        "type": "address"
                      },
                      {
                        "components": [
                          {
                            "internalType": "contract IERC20",
                            "name": "srcToken",
                            "type": "address"
                          },
                          {
                            "internalType": "contract IERC20",
                            "name": "dstToken",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "srcReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "dstReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "minReturnAmount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "flags",
                            "type": "uint256"
                          },
                          {
                            "internalType": "bytes",
                            "name": "permit",
                            "type": "bytes"
                          }
                        ],
                        "internalType": "struct SwapDescription",
                        "name": "_desc",
                        "type": "tuple"
                      },
                      {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                      }
                    ],
                    "internalType": "struct DexData",
                    "name": "_dex",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct ToChainData",
                "name": "toChain",
                "type": "tuple"
              }
            ],
            "indexed": false,
            "internalType": "struct SwapData",
            "name": "",
            "type": "tuple"
          }
        ],
        "name": "Swap",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_dex",
            "type": "address"
          }
        ],
        "name": "changeDex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dex",
        "outputs": [
          {
            "internalType": "contract OneInchProvider",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "_fromChainID",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "_toChainID",
            "type": "uint16"
          }
        ],
        "name": "getNonce",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "forwarder",
            "type": "address"
          }
        ],
        "name": "isTrustedForwarder",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "pools",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "tokenAddr",
            "type": "address"
          }
        ],
        "name": "rescueFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_token",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_pool",
            "type": "address"
          }
        ],
        "name": "setPools",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "_fromToken",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_toToken",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "_extraParams",
                    "type": "bytes"
                  },
                  {
                    "internalType": "uint16",
                    "name": "_commLayerID",
                    "type": "uint16"
                  },
                  {
                    "components": [
                      {
                        "internalType": "contract IAggregationExecutor",
                        "name": "_executor",
                        "type": "address"
                      },
                      {
                        "components": [
                          {
                            "internalType": "contract IERC20",
                            "name": "srcToken",
                            "type": "address"
                          },
                          {
                            "internalType": "contract IERC20",
                            "name": "dstToken",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "srcReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "dstReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "minReturnAmount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "flags",
                            "type": "uint256"
                          },
                          {
                            "internalType": "bytes",
                            "name": "permit",
                            "type": "bytes"
                          }
                        ],
                        "internalType": "struct SwapDescription",
                        "name": "_desc",
                        "type": "tuple"
                      },
                      {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                      }
                    ],
                    "internalType": "struct DexData",
                    "name": "_dex",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct FromChainData",
                "name": "fromChain",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "_fromToken",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_toToken",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_destination",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                  },
                  {
                    "components": [
                      {
                        "internalType": "contract IAggregationExecutor",
                        "name": "_executor",
                        "type": "address"
                      },
                      {
                        "components": [
                          {
                            "internalType": "contract IERC20",
                            "name": "srcToken",
                            "type": "address"
                          },
                          {
                            "internalType": "contract IERC20",
                            "name": "dstToken",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "srcReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "address payable",
                            "name": "dstReceiver",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "minReturnAmount",
                            "type": "uint256"
                          },
                          {
                            "internalType": "uint256",
                            "name": "flags",
                            "type": "uint256"
                          },
                          {
                            "internalType": "bytes",
                            "name": "permit",
                            "type": "bytes"
                          }
                        ],
                        "internalType": "struct SwapDescription",
                        "name": "_desc",
                        "type": "tuple"
                      },
                      {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                      }
                    ],
                    "internalType": "struct DexData",
                    "name": "_dex",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct ToChainData",
                "name": "toChain",
                "type": "tuple"
              }
            ],
            "internalType": "struct SwapData",
            "name": "swapData",
            "type": "tuple"
          }
        ],
        "name": "swap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const biconomy: any = new Biconomy(window.ethereum as ExternalProvider, {
        // walletProvider: window.ethereum as ExternalProvider,
        apiKey: "3Za3M_Tcu.b0f84350-0820-4225-b0f4-7cace0ee0c72",
        debug: true,
        contractAddresses: [contractAddress],
    });

    biconomy.onEvent(biconomy.READY, async () => {
        console.log("intiated");
    });

    biconomy
        .onEvent(biconomy.READY, async () => {

            const contractInstance: any = new ethers.Contract(
                contractAddress,
                abi,
                biconomy.getSignerByAddress(address)
            );
            const {data} =
                await contractInstance.populateTransaction.swap(
                    swapData,
                    {gasLimit: 1000000}
                );

            let txn = {
                data: data,
                to: contractAddress,
                from: address,
                signatureType: "EIP712_SIGN",
            };
            let transactionHash;

            try {
                let ethersProvider = biconomy.getEthersProvider();

                let txhash = await ethersProvider.send("eth_sendTransaction", [
                    txn,
                ]);

                let receipt = await ethersProvider.waitForTransaction(txhash);
                console.log(receipt);

                return txhash;
            } catch (error: any) {
                if (error.returnedHash && error.expectedHash) {
                    console.log("Transaction hash : ", error.returnedHash);
                    transactionHash = error.returnedHash;
                } else {
                    console.log(error);
                }

            }

        })
        .onEvent(biconomy.ERROR, (error: any, message: any) => {
            console.log(message);
            console.log(error);
        });
};