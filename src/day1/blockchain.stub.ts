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
  }


  // Add a new Block in the Blockchain
  // :return: <block> the new block
  addBlock() {
    return ;
  }

  // Adds some new data to teh next block to be mined
  // :return: <number> The index of the block that will hold this data
  addData() {
    return ;
  }

  // Return the last block of the chain
  // :return: <block> the last block
  getLastBlock(){
    return ;
  }
}
