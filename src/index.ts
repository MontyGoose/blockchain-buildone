import { Blockchain } from "../src/day2/blockchain.day2.js"
import boxen from "boxen"

let blockchain = new Blockchain(2); // build a new blockchain
console.log("VALID: ",blockchain.validateChain());
let data = 'some important data';
let transaction = blockchain.addData(data);
let new_block = blockchain.addBlock();
console.log("VALID: ",blockchain.validateChain());
blockchain.addData("hello")
blockchain.addBlock()
console.log("VALID: ",blockchain.validateChain());


blockchain.getChain().forEach(block => {
    console.log(boxen(block.index+"\n"+block.hash+"\n"+block.previous_hash, {padding:1}))
})


