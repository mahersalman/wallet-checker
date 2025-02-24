# Wallet Balance Checker

## Description

This project allows you to generate random 12-word mnemonics and check the balances of Ethereum, Polygon, Arbitrum, Binance Smart Chain (BNB), and Base networks. The balances are retrieved via the Alchemy API, and if any balance is greater than zero, the wallet's information is logged into separate text files. These text files are saved in the `wallets` directory.

## Requirements

- Node.js (>= v14)
- An Alchemy API Key (for accessing the network providers)

## Setup Instructions

1. **Clone the repository** (if applicable) or create a new folder for your project.

2. **Install dependencies:**
   Open a terminal in the project directory and run:

   ```bash
   npm install
   ```

3. **Get an API Key from Alchemy:**
   - Visit [Alchemy](https://www.alchemy.com/).
   - Create an account and log in.
   - Create a new project and obtain your API key.
4. **Insert your Alchemy API Key:**
   Open `index.js` and paste your API key in the following line:

   ```javascript
   const API_KEY = "your-api-key-here";
   ```

5. **Run the application:**
   After setting the API key, run the script using Node.js:

   ```bash
   node index.js
   ```

6. **Output:**
   - If the script finds any wallet with a balance greater than zero, it will save the wallet's address, mnemonic, private key, and balances in a file inside the `wallets` folder.
   - The `wallets` folder will be created automatically if it doesn't exist.

## Example Output in `wallets/` folder:

```
Address: 0x000000000000000000000000000000
Mnemonic: XXX
Private Key: 0xabc123...
ETH: 0.1234 | Polygon: 1.567 | Arbitrum: 0.89 | BNB: 0.11 | Base: 0
```

## Notes

- The script continuously generates random mnemonics and checks their balances. If you want to stop it, you can interrupt the process using `Ctrl + C`.
- The script uses `ethers.js` for interacting with the blockchain networks and `fs` to handle file operations.

## Disclaimer

- **Usage of this script is at your own risk**. The project is not responsible for any consequences or misuse.
- **The probability of finding a wallet with funds is extremely low**, and the script is intended for educational purposes only. Do not use it with any malicious intent.
- **This script is for testing purposes**. Use it responsibly and ethically.
