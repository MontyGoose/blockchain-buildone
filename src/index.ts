import { Blockchain } from "../src/day2/blockchain.day2.js"
import boxen from "boxen"

console.time("block1")
let blockchain = new Blockchain(2); // build a new blockchain
console.timeEnd("block1");


let data = 'some important data';
let transaction = blockchain.addData(data);
console.time("block2")
let new_block = blockchain.addBlock();
console.timeEnd("block2")


blockchain.addData("hello")
console.time("block3")
blockchain.addBlock()
console.timeEnd("block3")

blockchain.getChain()[1].data = ["something else"]

console.log("VALID: ",blockchain.validateChain());


blockchain.getChain().forEach(block => {
    console.log(boxen(block.index+"\n"+block.hash+"\n"+block.previous_hash, {padding:1}))
})


