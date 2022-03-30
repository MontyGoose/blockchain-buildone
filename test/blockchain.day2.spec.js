import * as chai from "chai";
import * as sinon from "sinon";
import "mocha";
var expect = chai.expect;
import { Blockchain } from "../src/day2/blockchain.day2.js";
describe('The blockchain', function () {
    var blockchain = new Blockchain(2); // build a new blockchain
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
        var data = 'some important data';
        var new_index = blockchain.addData(data);
        expect(new_index).to.equal(blockchain.getChain().length + 1); // the index provided back should be for the next block!
    });
    it('should allow blocks to be added', function () {
        var new_block = blockchain.addBlock();
        expect(new_block.index).to.equal(blockchain.getChain().length); // the index provided back should be for the next block! (this is our second)
        expect(new_block.data.length).to.equal(1); // we only added one item of data
        expect(new_block.data[0]).to.equal("some important data"); //should contain the data we added
        expect(new_block.timestamp).to.equal(now.getTime());
    });
    it('should allow the whole chain to be returned', function () {
        expect(blockchain.getChain().length).to.equal(2);
    });
});
describe('The blockchain hashing function', function () {
    var blockchain = new Blockchain(2); // build a new blockchain
    var clock;
    var now = new Date();
    beforeEach(function () {
        clock = sinon.useFakeTimers(now.getTime());
    });
    afterEach(function () {
        clock.restore();
    });
    it('should set genesis Previous Hash = 1', function () {
        expect(blockchain.getChain().length).to.equal(1); // we should have a 'genesis' block !
        expect(blockchain.getChain().slice().pop().previous_hash).to.equal('1');
    });
    it('should set Block3 Previous Hash correctly', function () {
        var data = { 'important': 'some important data' };
        blockchain.addData(data);
        blockchain.addBlock();
        blockchain.addData(data);
        blockchain.addBlock();
        expect(blockchain.getChain()[1].previous_hash).to.equal(blockchain.getChain()[0].hash); // previous hash should equal hashedGenesisBlock
        expect(blockchain.getChain()[2].previous_hash).to.equal(blockchain.getChain()[1].hash); // previous hash should equal hashedGenesisBlock
    });
});
describe('The blockchain mining and nonce', function () {
    var blockchain = new Blockchain(2); // build a new blockchain
    var clock;
    var now = new Date();
    beforeEach(function () {
        clock = sinon.useFakeTimers(now.getTime());
    });
    afterEach(function () {
        clock.restore();
    });
    it('should have a nonce > 0', function () {
        var data = { 'important': 'some important data' };
        blockchain.addData(data);
        var block = blockchain.addBlock();
        expect(block.nonce).to.greaterThan(0);
    });
    it('should have a hash that starts with right number of zeros', function () {
        var data = { 'important': 'some important data' };
        blockchain.addData(data);
        var block = blockchain.addBlock();
        expect(block.hash.substring(0, 2)).to.equal("00");
    });
});
