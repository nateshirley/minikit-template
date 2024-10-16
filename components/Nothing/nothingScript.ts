import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { worldchain } from "viem/chains"; // Assuming you're using Sepolia testnet

// ABI definition

async function writeNothing() {
  console.log("make sure you set a real private key");
  const account = privateKeyToAccount("0x0"); // TODO: replace with real private key

  const client = createWalletClient({
    account,
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  // const strHash = await client.writeContract({
  //   address: NOTHING_ADDRESS,
  //   abi: NOTHING_ABI,
  //   functionName: "changeName",
  //   args: ["hello"], // Use BigInt for uint256 arguments
  // });

  // console.log("Transaction hash:", strHash);

  // const changeCounterHash = await client.writeContract({
  //   address: NOTHING_ADDRESS,
  //   abi: NOTHING_ABI,
  //   functionName: "changeCounter",
  //   args: ["100"], // Use BigInt for uint256 arguments
  // });

  // console.log("Transaction hash:", changeCounterHash);
  /*
   */

  // const structHash = await client.writeContract({
  //   address: NOTHING_ADDRESS,
  //   abi: NOTHING_ABI,
  //   functionName: "acceptStruct",
  //   args: [
  //     {
  //       a: "1",
  //       b: "2",
  //     },
  //   ], // Use BigInt for uint256 arguments
  // });

  // console.log("Transaction hash:", structHash);
}

writeNothing().catch(console.error);
