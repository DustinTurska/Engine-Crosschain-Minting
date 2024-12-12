# Cross-Chain NFT Minting Demo

A demonstration of cross-chain NFT minting using thirdweb Engine, where users can send ETH on Base Sepolia and receive an NFT on Optimism Sepolia.

## Overview

This application showcases a seamless cross-chain minting experience where users can:
1. Connect their wallet on Base Sepolia
2. Send 0.001 Base Sepolia ETH
3. Automatically receive an NFT on Optimism Sepolia
4. Track the entire process through real-time notifications

## Features

- 🦊 Custom thirdweb [Connect Button](https://portal.thirdweb.com/react/v5/components/ConnectButton)
- ⛓️ Cross-chain functionality (Base Sepolia → Optimism Sepolia)
- 🎨 Clean, responsive UI using Tailwind CSS
- 📱 Mobile-friendly design
- 🔔 Real-time transaction status updates
- 🔍 Direct block explorer links for minted NFTs

## Technical Stack

- **Frontend**: Next.js 14
- **Send Transaction**: thirdweb SDK
- **thirdweb Conect** [Custom Connect Button](https://portal.thirdweb.com/react/v5/components/ConnectButton)
- **Mint NFT**: [thirdweb Engine](https://thirdweb.com/engine)
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Notifications**: React-Toastify

## Prerequisites

- Node.js 18.x or higher
- A wallet with Base Sepolia ETH (for testing)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
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
