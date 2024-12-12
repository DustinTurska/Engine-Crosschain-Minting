"use client";

import Image from "next/image";
import {
  Blobbie,
  ConnectButton,
  useActiveAccount,
  useConnectModal,
  useWalletDetailsModal,
} from "thirdweb/react";
import { client } from "./client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { prepareTransaction, sendTransaction } from "thirdweb/transaction";
import { toWei } from "thirdweb/utils";
import { defineChain } from "thirdweb/chains";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const chain = defineChain({
  id: 84532,
});

const theme = "dark";

const nftImage =
  "https://ipfs.io/ipfs/QmciR3WLJsf2BgzTSjbG5zCxsrEQ8PqsHK7JWGWsDSNo46/nft.png";

export default function Home() {
  const activeAccount = useActiveAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [txUrl, setTxUrl] = useState<string | null>(null);
  const { connect, isConnecting } = useConnectModal();
  const detailsModal = useWalletDetailsModal();

  async function handleConnect() {
    if (activeAccount) {
      // If an account is already connected, open the wallet details modal
      detailsModal.open({ client });
    } else {
      // If no account is connected, connect
      const wallet = await connect({ client });
      console.log("connected to", wallet);
    }
  }

  const handleOnSuccess = async (transactionHash: string) => {
    if (!activeAccount?.address) return;

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: activeAccount.address,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      if (data.data.blockExplorerUrl) {
        setTxUrl(data.data.blockExplorerUrl);
        return data.data;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            chain={chain}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
            theme={theme}
          />
        </div>

        {/* <div className="flex justify-center mb-20">
          {activeAccount ? (
            <Button
              variant="outline"
              onClick={handleConnect}
              className="flex items-center gap-2"
            >
              <div className="rounded-full overflow-hidden">
                <Blobbie address={activeAccount.address} size={24} />
              </div>
              <span>
                {activeAccount.address.slice(0, 6)}...
                {activeAccount.address.slice(-4)}
              </span>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleConnect}
              className="flex items-center gap-2"
            >
              Connect
            </Button>
          )}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <Image src={nftImage} alt="NFT" width={300} height={300} />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cross-Chain Minting</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Send 0.001 Base Sepolia ETH to Engine backend wallet. Receive
                  an NFT on Optimism Sepolia.
                </p>
              </CardContent>
              <CardContent>
                <Button
                  variant="outline"
                  disabled={!activeAccount || isLoading}
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      const transaction = prepareTransaction({
                        to: "0x62ead6657dccA283Fb9f8111C820f4367CBAf2cF",
                        chain: chain,
                        value: toWei("0.001"),
                        client: client,
                      });

                      const { transactionHash } = await sendTransaction({
                        account: activeAccount!,
                        transaction,
                      });

                      // First toast
                      toast.success("Payment Sent to Engine Backend", {
                        autoClose: 3000  // 3 seconds
                      });

                      // Wait 2 seconds before showing the minting toast
                      await new Promise(resolve => setTimeout(resolve, 2000));

                      // Show minting toast and store its ID
                      const mintingToastId = toast.info("Minting NFT on OP Sepolia...", {
                        autoClose: false  // Stay open until we dismiss it
                      });

                      const response = await handleOnSuccess(transactionHash);
                      if (response?.blockExplorerUrl) {
                        // Dismiss the minting toast
                        toast.dismiss(mintingToastId);
                        
                        toast.success(
                          <div>
                            NFT Minted! View on{" "}
                            <a
                              href={response.blockExplorerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              Block Explorer
                            </a>
                          </div>,
                          {
                            autoClose: 8000  // 8 seconds for the final toast with the link
                          }
                        );
                      }
                    } catch (error) {
                      toast.error("Failed to mint NFT");
                      console.error(error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {isLoading ? "Minting..." : "Mint"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </main>
  );
}
