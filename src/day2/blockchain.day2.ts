import * as crypto from "crypto";

interface Block {  // our block
  index:number;
  timestamp:number;
  data:Array<Object>;
  hash:string;
  previous_hash:string;
  nonce:number;
}

export class Blockchain {

  chain = [];  //holds the whole chain
  blockData = [];  //holds the data we want to add to a block
  difficulty = 0;

  //this will initialise the blockchain (Genesis)
  constructor(difficulty: number) {
    this.difficulty = difficulty;
    this.addBlock();
  }

  // Add a new Block in the Blockchain
  // :return: <block> the new block
  addBlock() {
    let block = this.createBlock();
    block.hash = this.hash(block); // create the hash for this block

    this.mineBlock(block,this.difficulty);

    // Reset the current list of data
    this.blockData = [];
    // add the block to the chain
    this.chain.push(block);
    return block;
  }

  // Adds some new data to the next block to be mined
  // :return: <number> The index of the block that will hold this data
  addData(data : Object) {
    this.blockData.push(data);
    return (this.chain.length + 1);  // next block to be added
  }

  // Return the chain
  // :return: [<block>] all the blocks in index order
  getChain(): readonly Block[] {
    return this.chain.sort((a, b) => a.index - b.index);
  }

  validateChain(): boolean {
    let valid = true;
    this.getChain().forEach((block, idx, arr) => {
      // the hash of the the block should be correct
      if (block.hash !== this.hash(block)) {
  //      console.warn("WARNING! Block has been manipulated at Index: " + block.index);
        valid = false;
      }
      // the previous_hash should equal the hash of the next previous bloack
      if (arr[idx + 1] && arr[idx + 1].previous_hash !== block.hash) {
    //    console.warn("WARNING! Link between blocks has been manipulated between Index: " + block.index + " and Index: " + arr[idx + 1].index);
        valid = false;
      }
    });
    return valid;
  }

  //private functions
  
  // create the next block using the current blockdata
  private createBlock() {
    let block : Block = {
      'index':this.chain.length  + 1,  //Javascript arrays start @ 0
      'timestamp': Date.now(),
      'data':this.blockData,
      'hash':'0',//create with empty hash
      'previous_hash':(this.chain.length > 0) ? this.hash(this.getChain().slice().pop()) : '1',
      'nonce':0
    }
    return block;
  }

  //sha256 method to create a hash from the block
  private hash(block: Block) {
    let hash = crypto.createHash('sha256').update(block.previous_hash + block.timestamp + block.data + block.nonce).digest('hex');
    return hash;
  }

  
  //
  private mineBlock(block: Block, difficulty: number) {
    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
       block.nonce++;
       block.hash = this.hash(block);
    }
  }
}
