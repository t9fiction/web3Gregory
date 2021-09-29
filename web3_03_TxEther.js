var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

const rpcUrl = "https://ropsten.infura.io/v3/8f0d7851dd8e4b8c80bcca17a3b17760";

const web3 = new Web3(rpcUrl);

const account = "0xB28EB6F6baafD0b33D64a3fdf47620849Eb2e494";

const privateKey = "919839cfc41c5ff9f7573e74f68381d46a98f139324b4c6766fda2177c854ba1";

const byteCode = "608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063262a9dff14610046578063967e6e6514610064578063d5dcf12714610082575b600080fd5b61004e61009e565b60405161005b9190610108565b60405180910390f35b61006c6100a4565b6040516100799190610108565b60405180910390f35b61009c600480360381019061009791906100cc565b6100ad565b005b60005481565b60008054905090565b8060008190555050565b6000813590506100c681610132565b92915050565b6000602082840312156100e2576100e161012d565b5b60006100f0848285016100b7565b91505092915050565b61010281610123565b82525050565b600060208201905061011d60008301846100f9565b92915050565b6000819050919050565b600080fd5b61013b81610123565b811461014657600080fd5b5056fea26469706673582212205b65fdba81cbdbf05c5f4d6341eb582c2880a0729164a1a35831fe8677e1389664736f6c63430008070033";

const bytecodeBuffer = Buffer.from(byteCode, "hex");

const privateKeyBuffer = Buffer.from(privateKey, "hex");

const account2 = "0x5cB8D34C14d23086000526115af22429aa01C21f";
// const privateKey2 = Buffer.from('3e0026027e6318d50ff24efb31fe83e42420ff4ad8c8e58f215399c4bfb06949', 'hex');


/*
Build a transaction object
Sign the transaction
Broadcast the transaction to the network
*/

/*
We can build the transaction object like this:

const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  Let me explain this code. We're building an object that has all the values needed to generate a transaction, like nonce, to, value, gasLimit, and gasPrice. Let's break down each of these values:

nonce - this is the previous transaction count for the given account. We'll assign the value of this variable momentarily. We also must convert this value to hexidecimal. We can do this with the 
Web3.js utilitly web3.utils.toHex()

to - the account we're sending Ether to.

value - the amount of Ether we want to send. This value must be expressed in Wei and converted to hexidecimal. We can convert the value to we with the Web3.js utility web3.utils.toWei().

gasLimit - this is the maximum amount of gas consumed by the transaction. A basic transaction like this always costs 21000 units of gas, so we'll use that for the value here.

gasPrice - this is the amount we want to pay for each unit of gas. I'll use 10 Gwei here.

Now let's get assign the value for the nonce variable. We can get the transaction nonce with
web3.eth.getTransactionCount() function.
 We'll wrap all of our code inside a callback function like this:
*/

web3.eth.getTransactionCount(account, (error, txCount)=>{
  if(error){
    console.log("error : ",error);
  }else{
    const txObj = {
      nonce : web3.utils.toHex(txCount),
	    to: account2,
      data: bytecodeBuffer,
      gasLimit: web3.utils.toHex(300000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10","gwei"))
    }
	// Step 2
    const tx = new Tx.Transaction(txObj,{chain:"ropsten",hardfork:"petersburg"});
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString('hex');
	
	/*Here we're using the etheremjs library to create a new Tx object. We also use this library to sign the transaction with privateKey1. Next, we serialize the transaction and convert it to a hexidecimal string so that it can be passed to Web3.*/
	
	/*Finally, we send this signed serialized transaction to the test network with the 
	web3.eth.sendSignedTransaction() function like this:*/
    web3.eth.sendSignedTransaction(raw, (err,txHash)=>{
      if(err){
        console.log("Error : ",err);
      }else{
        console.log("Transaction Hash: ", txHash);
      }
    }).then(receipt=>{
      console.log(receipt);
    })
  }

})

