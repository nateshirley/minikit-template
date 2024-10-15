"use client";
import {
  MiniAppSendTransactionPayload,
  MiniKit,
  ResponseEvent,
  SendTransactionInput,
} from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";
import { NOTHING_ABI, NOTHING_ADDRESS } from "./nothingConstants";

const integerInputExampleTxPayload: SendTransactionInput = {
  transaction: [
    {
      address: NOTHING_ADDRESS,
      abi: NOTHING_ABI,
      functionName: "changeCounter",
      args: [BigInt(1)],
    },
  ],
};

const stringInputExampleTxPayload: SendTransactionInput = {
  transaction: [
    {
      address: NOTHING_ADDRESS,
      abi: NOTHING_ABI,
      functionName: "changeName",
      args: ["hello"],
    },
  ],
};

const structInputExampleTxPayload: SendTransactionInput = {
  transaction: [
    {
      address: NOTHING_ADDRESS,
      abi: NOTHING_ABI,
      functionName: "acceptStruct",
      args: [
        {
          a: BigInt(1),
          b: BigInt(2),
        },
      ],
    },
  ],
};

export default function NothingTxTests() {
  function sendTx() {
    MiniKit.commands.sendTransaction(stringInputExampleTxPayload);
  }
  const [transactionId, setTransactionId] = useState<string>("");

  const client = createPublicClient({
    chain: worldchain,
    // Choose your own RPC optionally
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      client: client,
      appConfig: {
        app_id: "app_0844e90773d1ec26c4d47e111879f4c4",
      },
      transactionId: transactionId,
    });

  // console.log("isConfirming", isConfirming);
  // console.log("isConfirmed", isConfirmed);
  // https://developer.worldcoin.org/api/v2/minikit/transaction/0x58c3ee7b8567a05115b5822fc25fb74e9bbaf81e686af6ea9effd7e961a5008a?app_id=app_0844e90773d1ec26c4d47e111879f4c4&type=transaction
  // 0x58c3ee7b8567a05115b5822fc25fb74e9bbaf81e686af6ea9effd7e961a5008a


  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppSendTransaction,
      async (payload: MiniAppSendTransactionPayload) => {
        if (payload.status === "error") {
          console.error("Error sending transaction", payload);
        } else {
          console.log("Transaction sent", payload);
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppSendTransaction);
    };
  }, []);

  return (
    <div>
      <button
        className="border border-gray-400 p-4 text-red-500"
        onClick={() => {
          sendTx();
        }}
      >
        Test Send Tx!
      </button>
    </div>
  );
}
