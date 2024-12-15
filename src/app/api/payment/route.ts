import { Engine } from "@thirdweb-dev/engine";
import { NextRequest, NextResponse } from "next/server";
import * as dotenv from "dotenv";

dotenv.config();

const engine = new Engine({
    url: process.env.ENGINE_URL as string,
    accessToken: process.env.ACCESS_TOKEN as string,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const receiver = body.receiver;
    const metadataWithSupply = {
        "metadata": {
          "name": "Cross-Chain NFT Minting Demo",
          "description": "A demonstration of cross-chain NFT minting using thirdweb Engine, where users can send ETH on any supported chain and receive an NFT on Optimism Sepolia.",
          "image": "ipfs://QmciR3WLJsf2BgzTSjbG5zCxsrEQ8PqsHK7JWGWsDSNo46/nft.png"
        },
        "supply": "1"
      };

    const res = await engine.erc1155.mintTo(
      "11155420",
      "0xd3349CE88512A7783c1a3B425A64C84ac5d33f47", // Contract address
      "0x84ae6e34E420c1F12290D80041475c1d85F3F26C", // Engine Backend Wallet NOTE: Engine backend wallet needs to have MINTER_ROLE on the contract
      {
        receiver,
        metadataWithSupply,
      }
    );

    const poll = await pollToMine(res.result.queueId, receiver);

    return NextResponse.json({ success: true, data: poll });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function pollToMine(queueId: string, receiver: string) {
    try {
      // Add maximum attempts to prevent infinite polling
      const maxAttempts = 20;
      let attempts = 0;

      while (attempts < maxAttempts) {
        const status = await engine.transaction.status(queueId);
        
        if (status.result.status === "mined") {
          const transactionHash = status.result.transactionHash;
          const blockExplorerUrl = `https://optimism-sepolia.blockscout.com/tx/${transactionHash}`;
          return { status: "Mined", transactionHash, blockExplorerUrl };
        } else if (status.result.status === "errored") {
          return { status: "error", errorMessage: status.result.errorMessage };
        }
        
        // If not mined or errored, wait and try again
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        attempts++;
      }
      
      return { status: "timeout", errorMessage: "Transaction took too long to process" };
    } catch (error) {
      console.error("Error checking transaction status:", error);
      return {
        status: "error",
        errorMessage: "Failed to check transaction status",
      };
    }
}