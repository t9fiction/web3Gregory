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


const methodASync = async()=>{
	try{
		  const contract = new web3.eth.Contract(abi, contractAddress);
		  
		  let getAllEvents = await contract.getPastEvents('AllEvents',{
								fromBlock: 0,
								toBlock: 'latest'
			  					});
								  console.log("getAllEvents : ", getAllEvents);
	  		}catch(error){
				console.log("error : ",error);
	  		}
  }

  methodASync();

//   const methodASync = async()=>{
// 	try{

// 	}catch(error){
// 	  console.log("error : ",error);
// 	}
// }

// methodASync();