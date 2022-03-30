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

  //this will initialise the blockchain (Genesis)
  constructor() {
    this.addBlock();
  }

  // Add a new Block in the Blockchain
  // :return: <block> the new block
  addBlock() {
    let block = this.createBlock();
    block.hash = this.hash(block); // create the hash for this block

    this.mineBlock(block,2);

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
  // :return: [<block>] all the blocks
  getChain(){
    return this.chain;
  }

  //private functions
  
  // create the next block using the current blockdata
  private createBlock() {
    let block : Block = {
      'index':this.chain.length  + 1,  //Javascript arrays start @ 0
      'timestamp': Date.now(),
      'data':this.blockData,
      'hash':'0',//create with empty hash
      'previous_hash':(this.chain.length > 0) ? this.hash(this.chain.slice().pop()) : '1',
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
