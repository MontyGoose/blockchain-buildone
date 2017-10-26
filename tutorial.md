Before you get started
==
Remember that a blockchain is an immutable, sequential chain of records called blocks.

Blocks are basically a structed data item which can contain transactions, files or any data you like, really.  The important thing is that each block is chained to the one before - this is done by creating a hash of of the previous chain and storing it on the next chain.  This chaining is what makes a blockchain the thing it is - linking blocks in sequence, allowing us to prove integrity of the chain, and spot if anything changes.

<<PICTURE NEEDED>>  <<and links to other sites on BC>>

So what does out block look like?
Each of our blocks will have an index, a timestamp, the data we want to add and the hash of the previous block - remember, we want to chain this block to the previous one.

Like this
```
block = {
    'index': 1,
    'timestamp': 1507397024,
    'data': [
        {
            'important':'something important stored on the blockchain'
        }
    ],
    'previous_hash': "2aeed9bf82307fd9b9fe164b78c0129ee25696677d5a089b0c6e921550377015"
}
```

Rght - let's get started.

Build a project
==
```
mkdir buildone
cd buildone
```
Let's build a structure like this

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

## Initialise the project


```
npm init
```

This will present a series of prompts - as this is just a tutorial, you can take all the defaults - this will create a **package.json** file, which we'll amend this as we go.

```
tsc --init
```
This will create an empty **tsconig.json** - which like the **package.json** we'll amend as we go.

Right, we have out project structure, now we'll install some simple stuff we'll need.

## Install modules

Let's start as we meant to go on, and install some testing tools  .. oh yes we are ...that's why we created a test folder ...  
I'm choosing [mocha](https://mochajs.org/) / [chai](http://chaijs.com/) and [sinon](http://sinonjs.org/) for this - you can use you're own favourites, but all my examples and code will be mocha/chai flavours.
```
npm install mocha chai sinon --save-dev
npm install @types/chai @types/mocha @types/sinon --save-dev
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

What do we want to be able to do on out very simple Blockchain.  Let's start super simple -
* **Initialise** the blockchain
* **Add data** we want to be able to add some data to a block !
* **Add / Mine a block** we then want to be able to add the block to the chain
* **Return the chain** we want to be able to get hold of the whole chain
* **Hashing function** we need to be able to create a hash of things, but we don't need to expose this, so we'll make it only available to our blockchain class

This will all get more complex - but this is a good place to start.  

Let's create some stub code, that represents the above functions for our blockchain.

Create a file in the src folder, blockchain.ts, which will represent our blockchain and the functions we've described above.

```Javascript
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
  getChain(){
    return ;
  }

  // private hashing function
  // :param <block>: thing to hash
  // :return hash: hash
  private hash(){
    return;
  }
}
```


Let's create a test which represents this;

create a file in the test folder, blockchain.spec.ts
```Javascript
import * as chai from "chai";
import * as sinon from "sinon";
import "mocha";

const expect = chai.expect;

import { Blockchain } from "../src/blockchain.stub.2"

describe('The blockchain', () => {

  let blockchain = new Blockchain(); // build a new blockchain
  let clock;
  let now = new Date();

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime());
  });
  afterEach(() => {
    clock.restore();
  });

  it('should initialise correctly', () => {
    expect(blockchain.getChain().length).to.equal(1); // we should have a 'genesis' block !
  });

  it('should allow data to be added', () => {
    let data = { 'important': 'some important data' };
    let new_index = blockchain.addData(data);
    expect(new_index).to.equal(blockchain.getChain().length + 1); // the index provided back should be for the next block!
  });

  it('should allow blocks to be added', () => {
    let new_block = blockchain.addBlock();
    expect(new_block.index).to.equal(blockchain.getChain().length); // the index provided back should be for the next block! (this is our second)
    expect(new_block.data.length).to.equal(1);  // we only added one item of data
    expect(new_block.data[0].important).to.equal('some important data'); //should contain the data we added
    expect(new_block.timestamp).to.equal(now.getTime());
  });

  it('should allow the whole chain to be returned', () => {
    expect(blockchain.getChain().length).to.equal(2);
  })
});
```
So this is going to fail like crazy, as we've not written any code in our Blockchain class - but you can still run the test - you should get something like the follow.

```
> tsc --project tsconfig.json

test/blockchain.stub.spec.ts(13,38): error TS2339: Property 'index' does not exist on type 'void'.
test/blockchain.stub.spec.ts(18,21): error TS2554: Expected 0 arguments, but got 1.
test/blockchain.stub.spec.ts(19,58): error TS2339: Property 'index' does not exist on type 'void'.
test/blockchain.stub.spec.ts(24,22): error TS2339: Property 'index' does not exist on type 'void'.
test/blockchain.stub.spec.ts(25,22): error TS2339: Property 'data' does not exist on type 'void'.
test/blockchain.stub.spec.ts(26,22): error TS2339: Property 'data' does not exist on type 'void'.
test/blockchain.stub.spec.ts(27,38): error TS2339: Property 'index' does not exist on type 'void'.
npm ERR! Test failed.  See above for more details.
```

So let's make it all go away.

### Initialise
This is straighforward - we just want to add a block, we'll delegate working out if this is the first ever block to the addBlock function, so all we need to do here is
```Javascript
constructor() {
  this.addBlock();
}
```
### Add some data
Also this shouldn't tax us - we just want to take in some data, and push onto the blockData array, and the return the block we're wanting to add it to - thus
```Javascript
addData(data : Object) {
  this.blockData.push(data);
  return (this.chain.length + 1);  // next block to be added
}
```
### Return the whole chain
Again, this is simple
```Javascript
getChain(){
  return this.chain;
}
```
### Adding a block
A couple of things need to happen here
* create a block
* reset the data Array (this way we don't double add data to blocks)
* add the block to the chain

```Javascript
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
```
The only slightly complex part here is the ternary operator to work out the previous_hash, which is checking if there are alredy blocks, and if so setting the previous_hash to a hash of the previous block, or if it's the first ever setting to 1, which is one of our test conditions.

We're going to skip the hashing right now - we'll do that next - so for now, we'll just keep our mock.

### Testable?
With all the changes above made, let's see what happens to our test.

```
> mocha 'test/*.spec.js'

  The blockchain
    ✓ should initialise correctly
    ✓ should allow data to be added
    ✓ should allow blocks to be added
    ✓ should allow the whole chain to be returned

  4 passing (13ms)

```
They will now all pass :-)

Final bit for Part 1 - and we've covered a lot - but we do need to add our Hashing function - at the moment, our blocks don't link together.
And don't worry, we're not going to write our own SHA-256 algorithm (well not today anyway), we'll use the one that comes with Node.
As we're already using Node we don't need to re-add it, but we do need to add the typings for Typescript, so at the project root:
```
npm install @types/node --save-dev
```

So this is going to get a little more complex, perhaps time to fill up on coffee/tea/water

Now as the hashing function is private, we can't directly test it, but we can test the output as part of adding block.
The first block the previous hash will be 1
The second block the previous hash will be a hash of block 1.  So if we force block 1 to be something we know, we can then test that the previous hash of block 2 will be something known too.


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
