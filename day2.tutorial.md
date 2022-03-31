Overview
==
Welcome to Day 2 of our learn by building a simple blockchain.  In this tutorial we're going to step it up a notch - and work on a Proof of Work algorithm and expose our blockchain as APIs.

As before ..

* I'm using Javascript because I like it.
* I am not advocating anything.
* This will have security/implementation holes.
* This is NOT a fully working blockchain solution.
* It's a bit of fun
* I found it useful to write, I hope you find it useful to read.

Enjoy (or not)

Before we get started
==
Did you do Day1 ?

Nice - so let's get started with Day 2.  So only 2 things on our plate today 
* **Validate our chain** has anyone tampered with it?
* **Mining** we need to do some work before we can just add a block  

Validation
==
So there are 2 things we want to check for in our chain.
* Has a block been tampered?
* Has a chain been tampered?

Fortunately, both these are straightforward for us to check, but lets start with building our tests first.

```Javascript
describe('The chain should validate', () => {
  let clock;
  let now = new Date();

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime());
  });
  afterEach(() => {
    clock.restore();
  });

  it('should validate', () => {
    let blockchain = new Blockchain(0); // build a new blockchain
    blockchain.addData({ 'important': 'some important data' });
    blockchain.addBlock();
    expect(blockchain.validateChain()).to.equal(true);
  });

  it('should not validate is a block is tampered with', () => {
    let blockchain = new Blockchain(0); // build a new blockchain
    blockchain.addData({ 'important': 'some important data' });
    blockchain.addBlock();
    blockchain.getChain()[1].data = ["something else"]; // change the data
    expect(blockchain.validateChain()).to.equal(false);
  });
  
  it('should not validate is the chain is tampered with', () => {
    let blockchain = new Blockchain(0); // build a new blockchain
    blockchain.addData({ 'important': 'some important data' });
    blockchain.addBlock();
    blockchain.getChain()[1].previous_hash = "1" // repoint the previous hash
    expect(blockchain.validateChain()).to.equal(false);
  });
})
```
So these are our 3 very simple tests

#1 - we build a block chain, do nothing to it - we expect it to validate  
#2 - we build a block chain, but then change the data - we expect it to not validate  
#3 - we build a block chain, but then repoint the previous hash - again, we expect it to not validate

OK, so we know these are going to not work right now, as we've not build the **validateChain** funtion, so lets go ahead and do that now.  
In our code, right after the **getChain** function lets add the following.

```Javascript
  validateChain(): boolean {
    let valid = true;
    this.getChain().forEach((block, idx, arr) => {
      // the hash of the the block should be correct
      if (block.hash !== this.hash(block)) valid = false;
      // the previous_hash should equal the hash of the next previous bloack
      if (arr[idx + 1] && arr[idx + 1].previous_hash !== block.hash) valid = false;
    });
    return valid;
  }
```

Here we have a function, that loops through each block od the chain and does two things.

Firstly it compares the actual hash stored on the block, with a new hash we create from the contects of the block, if these hashes don't match, we have a problem, our block has been tampered with.  
Secondly it compares the previous hash stored on the next block in the sequence, with this blocks actual hash.  If these don't match, then we know the chain must have tanpered with in som way.

In either case we set our boolean to false, and once we've gone through the whole chain, we return either the boolean flag to denote the validity of the chain.

It's of course very simplistic, but you can see here how we can test each element of the block, the chains and the whole blockchain to see if it's as expected.

Running our tests now we should get
```

  The chain should validate
    √ should validate
    √ should not validate is a block is tampered with
    √ should not validate is the chain is tampered with

```
So now we know if our blockchain is value, onto the main course of our tutorial today ... mining.

Mining
==
What is a Proof of Work algorithm
A Proof of Work algorithm is how new Blocks are created or mined on the blockchain - there are different ways to do this

<<PICTURE NEEDED>>  <<and links to other sites on BC PoW>>

Things we changed

Add a function to validate the chain
Simple checks - does the hash still represent the block (will show if the hash or contents have been tampered with); 
- does the previous_hash (as set) match the previous block (Will show if the chain has been tampered with)

Do some mining ... Proof OF Work
Add nonce to block 
mining function added - and included when adding block
Hashing function needs to not include actual hash (as this changes as part of mining process)

Our tests fail, as hash changes and also need to change test to just ensure chain is linked....


