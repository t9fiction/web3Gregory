var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

const rpcUrl = "https://ropsten.infura.io/v3/8f0d7851dd8e4b8c80bcca17a3b17760";

const web3 = new Web3(rpcUrl);


const abi = [
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "sendEther",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

const contractAddress = "0x15a3537A7d2a9E79B51B5dc3951eA82e1D0cBeF5";
const contract = new web3.eth.Contract(abi, contractAddress);
const account1 = "0xB28EB6F6baafD0b33D64a3fdf47620849Eb2e494";
const privateKey1 = "919839cfc41c5ff9f7573e74f68381d46a98f139324b4c6766fda2177c854ba1";
const account2 = "0x5cB8D34C14d23086000526115af22429aa01C21f";
const privateKeyBuffer = Buffer.from(privateKey1, "hex");

const txCountFun = async () => {
	let txCount = await web3.eth.getTransactionCount(account1);
	try {
		const txObj = {
			nonce: web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(800000),
			gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
			to: contractAddress,
			data: contract.methods.sendEther(account2, 1000).encodeABI()
		}

		const tx = new Tx.Transaction(txObj, { chain: "ropsten", hardfork: "petersburg" });

		tx.sign(privateKeyBuffer);
		const serializedTx = tx.serialize();
		const raw = "0x" + serializedTx.toString('hex');

		let signedTx = await web3.eth.sendSignedTransaction(raw);
		console.log("signedTx : ",signedTx);

	}
	catch (error) {
		console.log("Error : ", error);
	}
}

txCountFun();