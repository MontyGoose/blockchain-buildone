import * as chai from "chai";
import * as sinon from "sinon";
import "mocha";

const expect = chai.expect;

import { Blockchain } from "../src/blockchain.stub.2"

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
    let data = { 'important': 'some important data' };
    let new_index = blockchain.addData(data);
    expect(new_index).to.equal(blockchain.getChain().length + 1); // the index provided back should be for the next block!
  });

  it('should allow blocks to be added', () => {
    let new_block = blockchain.addBlock();
    expect(new_block.index).to.equal(blockchain.getChain().length); // the index provided back should be for the next block! (this is our second)
    expect(new_block.data.length).to.equal(1);  // we only added one item of data
    expect(new_block.data[0].important).to.equal('some important data'); //should contain the data we added
    expect(new_block.timestamp).to.equal(now.getTime());
  });

  it('should allow the whole chain to be returned', () => {
    expect(blockchain.getChain().length).to.equal(2);
  })
});


describe('The blockchain', () => {
});
