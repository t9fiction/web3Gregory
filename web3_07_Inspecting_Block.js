var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

const rpcUrl = "https://ropsten.infura.io/v3/8f0d7851dd8e4b8c80bcca17a3b17760";

const web3 = new Web3(rpcUrl);

const account1 = "0xB28EB6F6baafD0b33D64a3fdf47620849Eb2e494";

const methodASync = async () => {
    bNum = await web3.eth.getBlockNumber().then(console.log);
    // web3.eth.getBlock(bNum).then(console.log);
    gBlock = await web3.eth.getBlock('latest');
    lhash = gBlock.hash;
    console.log("Hash : ", lhash);

    lastThree = await web3.eth.getBlockNumber().then((latest) => {
    	for (let i = 0; i < 3; i++) {
    	  web3.eth.getBlock(latest - i).then(console.log)
    	}
      })

    gtx = await web3.eth.getTransactionFromBlock(lhash, 2).then(console.log);
}
methodASync();