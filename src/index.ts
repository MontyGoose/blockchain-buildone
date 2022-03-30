import { Blockchain } from "../src/day1/blockchain.day1"

let blockchain = new Blockchain(); // build a new blockchain
let data = 'some important data';
let transaction = blockchain.addData(data);
let new_block = blockchain.addBlock();


console.log(blockchain);


let hash = blockchain.getChain()[1].hash
console.log(hash)

