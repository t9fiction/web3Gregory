
const Web3 = require("Web3");
const rpcUrl = "https://ropsten.infura.io/v3/8f0d7851dd8e4b8c80bcca17a3b17760";
const account = "0xB28EB6F6baafD0b33D64a3fdf47620849Eb2e494";
const web3 = new Web3(rpcUrl);


const abi = [
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
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contractAddress = "0x3AA0d72F81B15f2bE64A4B1EC2A3BDF360AAff55";
const contract = new web3.eth.Contract(abi, contractAddress);

contract.methods.retrieve().call((error, result)=>{
    console.log("Number : ", result);
    console.log("error : ",error);
})
