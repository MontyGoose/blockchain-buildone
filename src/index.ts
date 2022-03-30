import { Blockchain } from "../src/day2/blockchain.day2"

let blockchain = new Blockchain(); // build a new blockchain
let data = 'some important data';
let new_index = blockchain.addData(data);
let new_block = blockchain.addBlock();


console.log(blockchain);


let hash = blockchain.getChain()[1].hash
console.log(hash)

