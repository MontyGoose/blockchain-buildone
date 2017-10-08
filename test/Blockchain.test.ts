
import * as chai from "chai";
import "mocha";

const expect = chai.expect;

import { Blockchain } from "../src/Blockchain"

describe('The blockchain', () => {

  let blockchain = new Blockchain(); // build a new blockchain

  it('should initialise with a genesis block', () => {
    expect(blockchain.last_block().index).to.equal(1); // the last block of the chain, will be the first too!
    expect(blockchain.last_block().previous_hash).to.equal(1); // 1 is the value we'll set for the genesis block
  });

  it('should allow transactions to be added', () => {
    let sender = 'sender';
    let recipient = 'recipient';
    let amount = 1234;
    let new_index = blockchain.new_transaction(sender, recipient, amount);
    expect(new_index).to.equal(blockchain.last_block().index + 1); // the index provided back should be for the next block!
  });

  it('should allow blocks to be added', () => {
    let new_block = blockchain.new_block(100);
    expect(new_block.index).to.equal(2); // the index provided back should be for the next block! (this is our second)
    expect(new_block.transactions.length).to.equal(1); //shoud contain the transation we created
    expect(blockchain.last_block().index).to.equal(2); // the last block of the chain, will be this one
  });



});
