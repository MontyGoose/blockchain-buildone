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
      'index':this.chain.length + 1,
      'timestamp': Date.now(),
      'data':this.blockData,
      'previous_hash':(this.getLastBlock()) ? this.hash(this.getLastBlock()) : 1
    }

    // Reset the current list of transactions
    this.blockData = [];

    this.chain.push(block);
    return block;
  }

  // Adds some new data to teh next block to be mined
  // :return: <number> The index of the block that will hold this data
  addData(data : Object) {
    this.blockData.push(data);

    return (this.getLastBlock().index) + 1;
  }

  // Return the last block of the chain
  // :return: <block> the last block
  getLastBlock(){
    return this.chain.slice().pop();
  }

  private hash(block: Block) {
    return ;
  }
}
