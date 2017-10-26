"use strict";
exports.__esModule = true;
var chai = require("chai");
var sinon = require("sinon");
require("mocha");
var expect = chai.expect;
var blockchain_stub_2_1 = require("../src/blockchain.stub.2");
describe('The blockchain', function () {
    var blockchain = new blockchain_stub_2_1.Blockchain(); // build a new blockchain
    var clock;
    var now = new Date();
    beforeEach(function () {
        clock = sinon.useFakeTimers(now.getTime());
    });
    afterEach(function () {
        clock.restore();
    });
    it('should initialise correctly', function () {
        expect(blockchain.getChain().length).to.equal(1); // we should have a 'genesis' block !
    });
    it('should allow data to be added', function () {
        var data = { 'important': 'some important data' };
        var new_index = blockchain.addData(data);
        expect(new_index).to.equal(blockchain.getChain().length + 1); // the index provided back should be for the next block!
    });
    it('should allow blocks to be added', function () {
        var new_block = blockchain.addBlock();
        expect(new_block.index).to.equal(blockchain.getChain().length); // the index provided back should be for the next block! (this is our second)
        expect(new_block.data.length).to.equal(1); // we only added one item of data
        expect(new_block.data[0].important).to.equal('some important data'); //should contain the data we added
        expect(new_block.timestamp).to.equal(now.getTime());
    });
    it('should allow the whole chain to be returned', function () {
        expect(blockchain.getChain().length).to.equal(2);
    });
});
describe('The blockchain', function () {
});
