export class Blockchain {

  chain = [];  //holds the whole chain
  current_transactions = [];  //holds transactions

  //this will initialise the blockchain, with a genesis block
  constructor() {
  }


  // Create a new Block in the Blockchain
  // :param proof: <number> The proof given by the Proof of Work algorithm
  // :param previous_hash: (Optional) <string> Hash of previous Block
  // :return: <block> the new block
  new_block(proof:number, previous_hash?:string) {
    return ;
  }

  // Creates a new transaction to go into the next mined Block
  // :param sender: <string> Address of the Sender
  // :param recipient: <string> Address of the Recipient
  // :param amount: <number> Amount
  // :return: <number> The index of the Block that will hold this transaction
  new_transaction(sender: string, recipient: string, amount: number) {
    return ;
  }
}
