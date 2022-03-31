import { Blockchain } from "../src/day2/blockchain.day2.js";
import boxen from "boxen";
console.time("block1");
var blockchain = new Blockchain(2); // build a new blockchain
console.timeEnd("block1");
var data = 'some important data';
var transaction = blockchain.addData(data);
console.time("block2");
var new_block = blockchain.addBlock();
console.timeEnd("block2");
blockchain.addData("hello");
console.time("block3");
blockchain.addBlock();
console.timeEnd("block3");
console.log("VALID: ", blockchain.validateChain());
blockchain.getChain().forEach(function (block) {
    console.log(boxen(block.index + "\n" + block.hash + "\n" + block.previous_hash, { padding: 1 }));
});
