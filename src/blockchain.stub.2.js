"use strict";
exports.__esModule = true;
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
            'timestamp': Date.now(),
            'data': this.blockData,
            'previous_hash': (this.getLastBlock()) ? this.hash(this.getLastBlock()) : 1
        };
        // Reset the current list of transactions
        this.blockData = [];
        this.chain.push(block);
        return block;
    };
    // Adds some new data to teh next block to be mined
    // :return: <number> The index of the block that will hold this data
    Blockchain.prototype.addData = function (data) {
        this.blockData.push(data);
        return (this.getLastBlock().index) + 1;
    };
    // Return the last block of the chain
    // :return: <block> the last block
    Blockchain.prototype.getLastBlock = function () {
        return this.chain.slice().pop();
    };
    Blockchain.prototype.hash = function (block) {
        return;
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
