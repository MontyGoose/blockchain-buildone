/// <reference types="node" />

import * as crypto from "crypto";
const hasher = crypto.createHash('sha256');

interface Block {
  index:number;
  timestamp:Date;
  transactions:Array<string>;
  proof:number;
  previous_hash:string;
}


export class Blockchain {

  chain = [];
  current_transactions = [];

  constructor() {
    //new Blockchain - genesis - build me; build me
    this.new_block(100,1);
  }


  // Create a new Block in the Blockchain

  // :param proof: <int> The proof given by the Proof of Work algorithm
  // :param previous_hash: (Optional) <str> Hash of previous Block
  // :return: <dict> New Block
  new_block(proof:number, previous_hash?:number) {
    let block = {
      'index':this.chain.length + 1,
      'timestamp': Date.now(),
      'transactions':this.current_transactions,
      'proof':proof,
      'previous_hash':(previous_hash) ? previous_hash : this.hash(this.last_block())
    }

    // Reset the current list of transactions
    this.current_transactions = [];

    this.chain.push(block);
    return block;

  }

  // Creates a new transaction to go into the next mined Block

  // :param sender: <str> Address of the Sender
  // :param recipient: <str> Address of the Recipient
  // :param amount: <int> Amount
  // :return: <int> The index of the Block that will hold this transaction
  new_transaction(sender: string, recipient: string, amount: number) {

    this.current_transactions.push(
      {
        'sender': sender,
        'recipient': recipient,
        'amount': amount
      }
    );

    return (this.last_block().index) + 1;

  }

  // Creates a SHA-256 hash of a Block

  // :param block: <dict> Block
  // :return: <str>
  hash(block: Block) {
    return "";
  }

  // Get the last Block in the chain

  // :return: <block> return last block in chain
  last_block() {
    return this.chain.slice().pop();
  }
}
