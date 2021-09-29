var Tx = require("ethereumjs-tx");
var Web3 = require("web3");

const rpcUrl = "https://ropsten.infura.io/v3/8f0d7851dd8e4b8c80bcca17a3b17760";

const web3 = new Web3(rpcUrl);

const account = "0xB28EB6F6baafD0b33D64a3fdf47620849Eb2e494";

const privateKey = "919839cfc41c5ff9f7573e74f68381d46a98f139324b4c6766fda2177c854ba1";

const byteCode = "608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063262a9dff14610046578063967e6e6514610064578063d5dcf12714610082575b600080fd5b61004e61009e565b60405161005b9190610108565b60405180910390f35b61006c6100a4565b6040516100799190610108565b60405180910390f35b61009c600480360381019061009791906100cc565b6100ad565b005b60005481565b60008054905090565b8060008190555050565b6000813590506100c681610132565b92915050565b6000602082840312156100e2576100e161012d565b5b60006100f0848285016100b7565b91505092915050565b61010281610123565b82525050565b600060208201905061011d60008301846100f9565b92915050565b6000819050919050565b600080fd5b61013b81610123565b811461014657600080fd5b5056fea26469706673582212205b65fdba81cbdbf05c5f4d6341eb582c2880a0729164a1a35831fe8677e1389664736f6c63430008070033";

const bytecodeBuffer = Buffer.from(byteCode, "hex");

const privateKeyBuffer = Buffer.from(privateKey, "hex");

// const account2 = "0x5cB8D34C14d23086000526115af22429aa01C21f";
// const privateKey2 = Buffer.from('3e0026027e6318d50ff24efb31fe83e42420ff4ad8c8e58f215399c4bfb06949', 'hex');

web3.eth.getTransactionCount(account, (error, txCount)=>{
  if(error){
    console.log("error : ",error);
  }else{
    const txObj = {
      nonce : web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(300000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10","gwei")),
      data: bytecodeBuffer
    }

    const tx = new Tx.Transaction(txObj,{chain:"ropsten",hardfork:"petersburg"});
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString('hex');
	
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

