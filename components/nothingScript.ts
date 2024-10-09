import { Abi, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { worldchain } from "viem/chains"; // Assuming you're using Sepolia testnet
import NOTHING_ABI_JSON from "./Nothing.json";

// ABI definition
const NOTHING_ABI = NOTHING_ABI_JSON.abi as Abi;

async function writeNothing() {
  console.log("make sure you set a real private key");
  const account = privateKeyToAccount("0x01"); // TODO: replace with real private key
  const NOTHING_ADDRESS = "0x8B6B419b4Ad7b078245091f210dE5ae848347301";

  const client = createWalletClient({
    account,
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const hash = await client.writeContract({
    address: NOTHING_ADDRESS,
    abi: NOTHING_ABI,
    functionName: "changeName",
    args: ["hello"], // Use BigInt for uint256 arguments
  });

  console.log("Transaction hash:", hash);
}

writeNothing().catch(console.error);
