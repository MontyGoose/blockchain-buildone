import * as chai from "chai";
import * as sinon from "sinon";
import "mocha";

import * as crypto from "crypto";


const expect = chai.expect;

import { Blockchain } from "../src/day1/blockchain.day1"

describe('The blockchain', () => {

  let blockchain = new Blockchain(); // build a new blockchain
  let clock;
  let now = new Date();

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime());
  });
  afterEach(() => {
    clock.restore();
  });

  it('should initialise correctly', () => {
    expect(blockchain.getChain().length).to.equal(1); // we should have a 'genesis' block !
  });

  it('should allow data to be added', () => {
    let data = 'some important data';
    let new_index = blockchain.addData(data);
    expect(new_index).to.equal(blockchain.getChain().length + 1); // the index provided back should be for the next block!
  });

  it('should allow blocks to be added', () => {
    let new_block = blockchain.addBlock();
    expect(new_block.index).to.equal(blockchain.getChain().length); // the index provided back should be for the next block! (this is our second)
    expect(new_block.data.length).to.equal(1);  // we only added one item of data
    expect(new_block.data[0]).to.equal("some important data"); //should contain the data we added
    expect(new_block.timestamp).to.equal(now.getTime());
  });

  it('should allow the whole chain to be returned', () => {
    expect(blockchain.getChain().length).to.equal(2);
  })
});


describe('The blockchain hashing function', () => {
  let blockchain = new Blockchain(); // build a new blockchain
  let clock;
  let now = new Date();

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime());
  });
  afterEach(() => {
    clock.restore();
  });

  it('should set genesis PH = 1', () => {
    expect(blockchain.getChain().length).to.equal(1); // we should have a 'genesis' block !
    expect(blockchain.getChain().slice().pop().previous_hash).to.equal('1');
  });

  it('should set Block2 PH correctly', () => {
    let genesisBlock = {index: 1, timestamp: now.getTime(), data: [], previous_hash: 1};  // our genesis block
    let hashedGenesisBlock = crypto.createHash('sha256').update(genesisBlock.toString()).digest('hex');  // hashed version

    let data = { 'important': 'some important data' };
    blockchain.addData(data);
    blockchain.addBlock();
    expect(blockchain.getChain().slice().pop().previous_hash).to.equal(hashedGenesisBlock); // previous hash should equal hashedGenesisBlock
  });

});
