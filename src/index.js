import { Blockchain } from "../src/day2/blockchain.day2.js";
import boxen from "boxen";
var blockchain = new Blockchain(2); // build a new blockchain
console.log("VALID: ", blockchain.validateChain());
var data = 'some important data';
var transaction = blockchain.addData(data);
var new_block = blockchain.addBlock();
console.log("VALID: ", blockchain.validateChain());
blockchain.addData("hello");
blockchain.addBlock();
console.log("VALID: ", blockchain.validateChain());
blockchain.getChain().forEach(function (block) {
    console.log(boxen(block.index + "\n" + block.hash + "\n" + block.previous_hash, { padding: 1 }));
});
