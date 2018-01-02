"use strict";
exports.__esModule = true;
var Blockchain = /** @class */ (function () {
    //this will initialise the blockchain
    function Blockchain() {
        this.chain = []; //holds the whole chain
        this.blockData = []; //holds the data we want to add to a block
    }
    // Add a new Block in the Blockchain
    // :return: <block> the new block
    Blockchain.prototype.addBlock = function () {
        return;
    };
    // Adds some new data to teh next block to be mined
    // :return: <number> The index of the block that will hold this data
    Blockchain.prototype.addData = function () {
        return;
    };
    // Return the last block of the chain
    // :return: <block> the last block
    Blockchain.prototype.getLastBlock = function () {
        return;
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
