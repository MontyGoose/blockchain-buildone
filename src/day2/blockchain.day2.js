"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var Blockchain = /** @class */ (function () {
    //this will initialise the blockchain
    function Blockchain() {
        this.chain = []; //holds the whole chain
        this.blockData = []; //holds the data we want to add to a block
        this.addBlock();
    }
    // Add a new Block in the Blockchain
    // :return: <block> the new block
    Blockchain.prototype.addBlock = function () {
        var block = {
            'index': this.chain.length + 1,
            'timestamp': new Date(Date.now()),
            'data': this.blockData,
            'hash': '0',
            'previous_hash': (this.chain.length > 0) ? this.hash(this.chain.slice().pop()) : '1'
        };
        block.hash = this.hash(block); // create the hash for this blocks
        // Reset the current list of data
        this.blockData = [];
        // add the block to the chain
        this.chain.push(block);
        return block;
    };
    // Adds some new data to teh next block to be mined
    // :return: <number> The index of the block that will hold this data
    Blockchain.prototype.addData = function (data) {
        this.blockData.push(data);
        return (this.chain.length + 1); // next block to be added
    };
    // Return the chain
    // :return: [<block>] the last block
    Blockchain.prototype.getChain = function () {
        return this.chain;
    };
    //
    Blockchain.prototype.mineBlock = function (difficulty) {
    };
    Blockchain.prototype.hash = function (block) {
        var hash = crypto.createHash('sha256').update(block.toString()).digest('hex');
        return hash;
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
