var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

const rpcUrl = "https://ropsten.infura.io/v3/8f0d7851dd8e4b8c80bcca17a3b17760";

const web3 = new Web3(rpcUrl);

const account1 = "0xB28EB6F6baafD0b33D64a3fdf47620849Eb2e494";



const methodASync = async () => {
  // Getting Gas Price  
  gPrice = await web3.eth.getGasPrice().then((result) => {
    console.log(web3.utils.fromWei(result, 'ether'));
  })
  
  //SHA3 Testing
  sha3Test = await web3.utils.sha3('Sohail Ishaque "The UNKNOWN"');
  console.log("Sha3Test", sha3Test);

  keccakTest = await web3.utils.keccak256('Sohail Ishaque "The UNKNOWN"');
  console.log("Keccak256", keccakTest);

  
  rHex = await web3.utils.randomHex(32);
  console.log("Random Hex", rHex);

  // var _ = web3.utils._;
// _.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
//   console.log(key)
// })
  
}
methodASync();