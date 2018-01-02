"use strict";
/// <reference types="node" />
exports.__esModule = true;
var crypto = require("crypto");
var hasher = crypto.createHash('sha256');
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [];
        this.current_transactions = [];
        //new Blockchain - genesis - build me; build me
        this.new_block(100, 1);
    }
    // Create a new Block in the Blockchain
    // :param proof: <int> The proof given by the Proof of Work algorithm
    // :param previous_hash: (Optional) <str> Hash of previous Block
    // :return: <dict> New Block
    Blockchain.prototype.new_block = function (proof, previous_hash) {
        var block = {
            'index': this.chain.length + 1,
            'timestamp': Date.now(),
            'transactions': this.current_transactions,
            'proof': proof,
            'previous_hash': (previous_hash) ? previous_hash : this.hash(this.last_block())
        };
        // Reset the current list of transactions
        this.current_transactions = [];
        this.chain.push(block);
        return block;
    };
    // Creates a new transaction to go into the next mined Block
    // :param sender: <str> Address of the Sender
    // :param recipient: <str> Address of the Recipient
    // :param amount: <int> Amount
    // :return: <int> The index of the Block that will hold this transaction
    Blockchain.prototype.new_transaction = function (sender, recipient, amount) {
        this.current_transactions.push({
            'sender': sender,
            'recipient': recipient,
            'amount': amount
        });
        return (this.last_block().index) + 1;
    };
    // Creates a SHA-256 hash of a Block
    // :param block: <dict> Block
    // :return: <str>
    Blockchain.prototype.hash = function (block) {
        return "";
    };
    // Get the last Block in the chain
    // :return: <block> return last block in chain
    Blockchain.prototype.last_block = function () {
        return this.chain.slice().pop();
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
