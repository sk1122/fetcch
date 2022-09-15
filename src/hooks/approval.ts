import { ethers } from "ethers";
import { Token } from "@wagpay/types";
// import { addresses } from "./useBridge";

export interface ApproveERC20 {
	amount: string;
	required: boolean;
}

export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const checkApprove = async (
  spender: string,
	token: Token,
	// chain: ChainId,
	amount: string,
	signer: ethers.Signer
): Promise<ApproveERC20> => {
	const addres = await signer.getAddress();

	// const spender = addresses[Number(chain)]

	const abi = [
		"function allowance(address owner, address spender) public view returns (uint256)",
	];
	const erc20 = new ethers.Contract(token.address, abi, signer);

	const allowance = await erc20.allowance(
		addres.toString(),
		spender.toString()
	);

  console.log(allowance);

	const allowanceNumber = Number(
		ethers.utils.formatUnits(allowance.toString(), token.decimals)
	);
	const amountNumber = Number(
		ethers.utils.formatUnits(amount, token.decimals)
	);

	if (allowanceNumber >= amountNumber) {
		return {
			amount: "0",
			required: false,
		};
	} else {
		return {
			amount: (amountNumber - allowanceNumber).toString(),
			required: true,
		};
	}
};

export const approve = async (
  spender: string,
	token: Token,
	// chain: ChainId,
	amount: string,
	signer: ethers.Signer
): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
    // const spender = addresses[Number(chain)]
		const ERC20abi = [
			"function approve(address _spender, uint256 _value) public returns (bool success)",
		];
		const erc20 = new ethers.Contract(token.address, ERC20abi, signer);
		try {
			await erc20.approve(
				spender,
				ethers.utils.parseUnits(amount, token.decimals)
			);
			resolve(true);
		} catch (e) {
			reject(false);
		}
	});
};

export const checkAndGetApproval = async (
  spender: string,
	token: Token,
	// chain: ChainId,
	amount: string,
	signer: ethers.Signer
): Promise<boolean> => {
	return new Promise(async (resolve) => {
		try {
      console.log("tryingg")
      console.log(token)
			if (
				token.address.toLowerCase() !==
				NATIVE_ADDRESS.toLowerCase()
			) {
				const needed = await checkApprove(
          spender,
					token,
					// chain as ChainId,
					amount.toString(),
					signer
				);
				// console.log(needed)
				if (needed.required) {
					await approve(
            spender,
						token,
						// chain as ChainId,
						needed.amount,
						signer
					);
				}
			}
			resolve(true)
		} catch (e) {
      console.log("error",e)
			resolve(false)
		}
	})
}