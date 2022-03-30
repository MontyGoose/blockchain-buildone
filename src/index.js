"use strict";
exports.__esModule = true;
var blockchain_day2_1 = require("../src/day2/blockchain.day2");
var blockchain = new blockchain_day2_1.Blockchain(); // build a new blockchain
var data = 'some important data';
var new_index = blockchain.addData(data);
var new_block = blockchain.addBlock();
console.log(blockchain);
var hash = blockchain.getChain()[1].hash;
console.log(hash);
