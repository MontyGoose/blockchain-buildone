import * as chai from "chai";
import "mocha";

const expect = chai.expect;

import { Blockchain } from "../src/blockchain.stub.2"

describe('The blockchain', () => {

  let blockchain = new Blockchain(); // build a new blockchain

  it('should initialise correctly', () => {
    expect(blockchain.getLastBlock().index).to.equal(1); // the first will also be the last !
  });

  it('should allow data to be added', () => {
    let data = { 'important': 'some important data' };
    let new_index = blockchain.addData(data);
    expect(new_index).to.equal(blockchain.getLastBlock().index + 1); // the index provided back should be for the next block!
  });

  it('should allow blocks to be added', () => {
    let new_block = blockchain.addBlock();
    expect(new_block.index).to.equal(2); // the index provided back should be for the next block! (this is our second)
    expect(new_block.data.length).to.equal(1);  // we only added one item of data
    expect(new_block.data[0].important).to.equal('some important data'); //should contain the data we added
    expect(blockchain.getLastBlock().index).to.equal(2); // the last block of the chain, will be this one
  });

});
