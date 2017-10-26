interface Block {  // our block
  index:number;
  timestamp:Date;
  data:Array<string>;
  hash:number;
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
    let block = {
      'index':this.chain.length  + 1,  //Javascript arrays start @ 0
      'timestamp': Date.now(),
      'data':this.blockData,
      'previous_hash':(this.chain.length > 0) ? this.hash(this.chain.slice().pop()) : 1
    }

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
  // :return: [<block>] the last block
  getChain(){
    return this.chain;
  }

  private hash(block: Block) {
    let hash = Crypto.
    return hash;
  }
}
