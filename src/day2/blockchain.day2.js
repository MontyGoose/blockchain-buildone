"use strict";
exports.__esModule = true;
exports.Blockchain = void 0;
var crypto = require("crypto");
var Blockchain = /** @class */ (function () {
    //this will initialise the blockchain (Genesis)
    function Blockchain() {
        this.chain = []; //holds the whole chain
        this.blockData = []; //holds the data we want to add to a block
        this.addBlock();
    }
    // Add a new Block in the Blockchain
    // :return: <block> the new block
    Blockchain.prototype.addBlock = function () {
        var block = this.createBlock();
        block.hash = this.hash(block); // create the hash for this block
        this.mineBlock(block, 2);
        // Reset the current list of data
        this.blockData = [];
        // add the block to the chain
        this.chain.push(block);
        return block;
    };
    // Adds some new data to the next block to be mined
    // :return: <number> The index of the block that will hold this data
    Blockchain.prototype.addData = function (data) {
        this.blockData.push(data);
        return (this.chain.length + 1); // next block to be added
    };
    // Return the chain
    // :return: [<block>] all the blocks
    Blockchain.prototype.getChain = function () {
        return this.chain;
    };
    //private functions
    // create the next block using the current blockdata
    Blockchain.prototype.createBlock = function () {
        var block = {
            'index': this.chain.length + 1,
            'timestamp': Date.now(),
            'data': this.blockData,
            'hash': '0',
            'previous_hash': (this.chain.length > 0) ? this.hash(this.chain.slice().pop()) : '1',
            'nonce': 0
        };
        return block;
    };
    //sha256 method to create a hash from the block
    Blockchain.prototype.hash = function (block) {
        var hash = crypto.createHash('sha256').update(block.previous_hash + block.timestamp + block.data + block.nonce).digest('hex');
        return hash;
    };
    //
    Blockchain.prototype.mineBlock = function (block, difficulty) {
        while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            block.nonce++;
            block.hash = this.hash(block);
        }
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
