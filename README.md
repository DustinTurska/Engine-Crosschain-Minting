# Cross-Chain NFT Minting Demo

A demonstration of cross-chain NFT minting using thirdweb Engine, where users can send ETH on any supported chain and receive an NFT on Optimism Sepolia.

## Overview

This application showcases a seamless cross-chain minting experience where users can:
1. Connect their wallet
2. Select from multiple supported chains (Base Sepolia, Optimism Sepolia, etc.)
3. Send 0.001 ETH on their chosen chain
4. Automatically receive an NFT on Optimism Sepolia
5. Track the entire process through real-time notifications

## How It Works

1. **Wallet Connection**
   - User connects their wallet using thirdweb's Connect Button
   - Application loads balances for all supported chains

2. **Chain Selection**
   - User can select from any supported chain where they have balance
   - Uses thirdweb's Network Switcher Modal for seamless network switching
   - Chains with 0 balance are automatically disabled

3. **Payment Process**
   - User initiates minting by clicking "Mint"
   - Application prepares a transaction to send 0.001 ETH
   - Transaction is sent using thirdweb's sendTransaction

4. **NFT Minting**
   - After payment confirmation, backend is notified via API call
   - Backend triggers NFT minting on Optimism Sepolia
   - User receives real-time updates via toast notifications

5. **Confirmation**
   - User receives confirmation with block explorer link
   - NFT is viewable on Optimism Sepolia

## Features

- 🦊 Custom thirdweb [Connect Button](https://portal.thirdweb.com/react/v5/components/ConnectButton)
- ⛓️ Multi-chain support with automatic balance checking
- 🔄 Seamless network switching via thirdweb Network Switcher
- 🎨 Clean, responsive UI using Tailwind CSS
- 📱 Mobile-friendly design
- 🔔 Real-time transaction status updates
- 🔍 Direct block explorer links for minted NFTs

## Technical Stack

- **Frontend**: Next.js 14
- **Send Transaction**: thirdweb SDK
- **thirdweb Conect** [Custom Connect Button](https://portal.thirdweb.com/react/v5/components/ConnectButton)
- **Mint NFT**: [thirdweb Engine](https://thirdweb.com/engine?utm_source=dustin-github-Engine-Crosschain-Minting)
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Notifications**: React-Toastify

## Prerequisites

- Node.js 18.x or higher
- A wallet with Base Sepolia ETH (for testing)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/DustinTurska/Engine-Crosschain-Minting
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with required environment variables:
```env
# Add any required environment variables here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Connect" to connect your wallet
2. Ensure you're on Base Sepolia network
3. Click "Mint" to initiate the cross-chain minting process
4. Approve the transaction in your wallet
5. Wait for confirmation and receive your NFT on Optimism Sepolia
6. Click the provided block explorer link to view your NFT

## Network Requirements

- **Payment Network**: Base Sepolia (Chain ID: 84532)
- **NFT Network**: Optimism Sepolia

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Acknowledgments

- Built with [thirdweb](https://thirdweb.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
