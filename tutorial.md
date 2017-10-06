Before you get started
==
Remember that a blockchain is an immutable, sequential chain of records called Blocks. They can contain transactions, files or any data you like, really. But the important thing is that they’re chained together using hashes.
In this example, we'll use a simple transaction which just details a from/to/amount relationship.

Rght - let's get started.

Build a project
==
```
mkdir buildone
cd buildone
```
Let's do this

```
proj/
   ├─ src/
   ├─ test/
   └─ dist/
```

```
mkdir src
mkdir test
mkdir dist
```

Initialise the project
--

```
npm init
```

This will present a series of prompts - as this is just a tutorial, you can take all the defaults - this will create a **package.json** file, which we'll amend this as we go.

```
tsc --init
```
This will create an empty **tsconig.json** - which like the **package.json** we'll amend as we go.

Right, we have out project structure, now we'll install some simple stuff we'll need.

Install modules
--
Let's start as we meant to go on, and install some testing tools  .. oh yes we are ...that's why we created a test folder ...  
I'm choosing [mocha](https://mochajs.org/) and [chai](http://chaijs.com/) for this - you can use you're own favourites, but all my examples and code will be mocha/chai flavours.
```
npm install mocha chai --save-dev
npm install @types/chai @types/mocha --save-dev
```
The first line installs the node_modules, the second the corresponding types files for Typescript

Nearly ready to do some code, but a few more config changes which will help us run our tests and get this to work properly.

First, we want to run our test automatically where we run *npm test*, so let's open up **package.json**, and replace the *"scripts"* tag with
```Javascript
"scripts": {
  "pretest": "tsc --project tsconfig.json",
  "test": "mocha 'test/*.spec.js'"
},
```

Let's just have a quick look at these changes

*pretest* is automatically executed before the test script, and calls TypeScript’s compiler to compile our test code into JS.

*test* can then call *mocha* and execute all the tests in our test folder.

>RECAP: We've not written any code yet, but we now have a great little project structure, testing frameworks installed and a way to run our tests.

>SUGGESTION:  Time to commit?

Representing Blockchain
==

Testable?
--

What do we want to be able to do on out very simple Blockchain.  Let's start super simple -
* Initialise
* Add transactions (from a sender, to a recipient, for an amount)
* Add / Mine a block (proof of work, previous hash (optional))

This will all get more complex - but this is a good place to start.  OK the add/mine a block looks complex already - I mean what are 'proof of work' and 'previous hash' - and why is it optional?  We'll cover this as we go through - but for impatient https://en.wikipedia.org/wiki/Proof-of-work_system and https://en.wikipedia.org/wiki/Hashcash


Right, for the rest of us - let's create some stub code, that represents the above 3 functions for our blockchain.

Create a file in the src folder, blockchain.ts, which will represent our blockchain and the functions we've described above.

```Javascript
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

```


Let's create a test which represents this;

create a file in the test folder, blockchain.spec.ts
```Javascript
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
```

Lines 1-4 : Setting up mocha and chai
Line 6 : Import in our Blockchain object




Going to get more complex .... time to add hashing of the Block
Important : JS Object is unordered - so force orderedness (!) - read a block by sorted key, rebuild as a string, and hash that ... forces a hash of a block to always be the same - or we're in the laps of the JS object gods!

Typescript - npm install @types/node

Something like ->
var string = '';
Object.keys(data)
      .sort()
      .forEach(function(v, i) {
        string += data[v]
       });
retrurn hasher(string);
