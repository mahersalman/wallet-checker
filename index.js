const fs = require("fs");
const { ethers } = require("ethers");
const path = require("path"); 
const outputDir = path.join(__dirname, "wallets");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); 
}

const API_KEY = "";

const getProvider = (network) => {
    const baseURL = `wss://${network}-mainnet.g.alchemy.com/v2/${API_KEY}`;
    return new ethers.providers.WebSocketProvider(baseURL);
  };
  
const provider_eth = getProvider('eth');
const provider_polygon = getProvider('polygon');
const provider_arb = getProvider('arb');
const provider_base = getProvider('base');
const provider_bnb = getProvider('bnb');

const words = fs.readFileSync("bip39.txt", "utf8").replace(/(\r)/gm, "").toLowerCase().split("\n");

function gen12(words) {
    return words.sort(() => 0.5 - Math.random()).slice(0, 12).join(" ");
}

async function main() {
    while (true) {
        try {
            const mnemonic = gen12(words);  
            const wallet = ethers.Wallet.fromMnemonic(mnemonic);
            const balances = {
                ETH: await provider_eth.getBalance(wallet.address),
                Polygon: await provider_polygon.getBalance(wallet.address),
                Arbitrum: await provider_arb.getBalance(wallet.address),
                Bnb: await provider_bnb.getBalance(wallet.address),
                Base: await provider_base.getBalance(wallet.address)
            };

            // Print balances in a single row format
            message = `Address: ${wallet.address} | ETH: ${balances.ETH} | Polygon: ${balances.Polygon} | Arbitrum: ${balances.Arbitrum} | BNB: ${balances.Bnb} | Base: ${balances.Base}`;
            console.log(message);

            // Check if any balance is greater than zero
            if (Object.values(balances).some(balance => parseFloat(balance) > 0)) {
                const logData = `Address: ${wallet.address}\nMnemonic: ${mnemonic}\nPrivate Key: ${wallet.privateKey}\n` +
                    `ETH: ${balances.ETH} | Polygon: ${balances.Polygon} | Arbitrum: ${balances.Arbitrum} | BNB: ${balances.BNB} | Base: ${balances.Base}\n\n`;

                // Write data into a separate file for each wallet
                const filePath = path.join(outputDir, `${wallet.address}.txt`);
                fs.writeFileSync(filePath, logData, "utf8");

            }
        } catch (e) {
        }
    }
}


main();
