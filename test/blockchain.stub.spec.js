"use strict";
exports.__esModule = true;
var chai = require("chai");
require("mocha");
var expect = chai.expect;
var blockchain_stub_2_1 = require("../src/blockchain.stub.2");
describe('The blockchain', function () {
    var blockchain = new blockchain_stub_2_1.Blockchain(); // build a new blockchain
    it('should initialise correctly', function () {
        expect(blockchain.getLastBlock().index).to.equal(1); // the first will also be the last !
    });
    it('should allow data to be added', function () {
        var data = { 'important': 'some important data' };
        var new_index = blockchain.addData(data);
        expect(new_index).to.equal(blockchain.getLastBlock().index + 1); // the index provided back should be for the next block!
    });
    it('should allow blocks to be added', function () {
        var new_block = blockchain.addBlock();
        expect(new_block.index).to.equal(2); // the index provided back should be for the next block! (this is our second)
        expect(new_block.data.length).to.equal(1); // we only added one item of data
        expect(new_block.data[0].important).to.equal('some important data'); //should contain the data we added
        expect(blockchain.getLastBlock().index).to.equal(2); // the last block of the chain, will be this one
    });
});
