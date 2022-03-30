"use strict";
exports.__esModule = true;
var blockchain_day1_1 = require("../src/day1/blockchain.day1");
var blockchain = new blockchain_day1_1.Blockchain(); // build a new blockchain
var data = 'some important data';
var transaction = blockchain.addData(data);
var new_block = blockchain.addBlock();
console.log(blockchain);
var hash = blockchain.getChain()[1].hash;
console.log(hash);
