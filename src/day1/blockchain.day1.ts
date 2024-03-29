import * as crypto from "crypto";

interface Block {  // our block
  index:number;
  timestamp:number;
  data:Array<Object>;
  hash:string;
  previous_hash:string;
}

export class Blockchain {

  chain = [];  //holds the whole chain
  blockData = [];  //holds the data we want to add to a block

  //this will initialise the blockchain
  constructor() {
    this.addBlock();
  }


  // Add a new Block in the Blockchain
  // :return: <block> the new block
  addBlock() {
    let block : Block = {
      'index':this.chain.length  + 1,  //Javascript arrays start @ 0
      'timestamp': Date.now(),
      'data':this.blockData,
      'hash':'0',//create with empty hash
      'previous_hash':(this.chain.length > 0) ? this.hash(this.getChain().slice().pop()) : '1'
    }

    block.hash = this.hash(block); // create the hash for this block

    // Reset the current list of data
    this.blockData = [];
    // add the block to the chain
    this.chain.push(block);
    return block;
  }

  // Adds some new data to teh next block to be mined
  // :return: <number> The index of the block that will hold this data
  addData(data : Object) {
    this.blockData.push(data);
    return (this.chain.length + 1);  // next block to be added
  }

  // Return the chain
  // :return: [<block>] all the blocks in index order
  getChain(){
    return this.chain.sort((a, b) => a.index - b.index);
  }

  private hash(block: Block) {
    let hash = crypto.createHash('sha256').update(block.previous_hash + block.timestamp + block.data).digest('hex');
    return hash;
  }
}
