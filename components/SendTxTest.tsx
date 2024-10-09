"use client";
import {
  MiniAppSendTransactionPayload,
  MiniKit,
  ResponseEvent,
  SendTransactionInput,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";
import { Abi } from "viem";
import NOTHING_ABI_JSON from "./Nothing.json";
const NOTHING_ABI = NOTHING_ABI_JSON.abi as Abi;
const NOTHING_ADDRESS = "0x8B6B419b4Ad7b078245091f210dE5ae848347301";

// minikit validates the txn but returns user_rejected before successfully simulating
// txn runs in script env with viem
// example script at ./nothingScript.ts
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

// with single string input arg, the transaction won't validate
// same as with a txn that takes no inputs
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

export default function SendTxTest() {
  function sendTx() {
    MiniKit.commands.sendTransaction(integerInputExampleTxPayload);
  }

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
        className="h-12 w-32 bg-600"
        onClick={() => {
          sendTx();
        }}
      >
        Send Tx
      </button>
    </div>
  );
}
