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
    expect(blockchain.validateChain()).to.be.an('array').that.is.empty;
  });

  it('should not validate is a block is tampered with', () => {
    let blockchain = new Blockchain(0); // build a new blockchain
    blockchain.addData({ 'important': 'some important data' });
    blockchain.addBlock();
    blockchain.getChain()[1].data = ["something else"]; // change the data
    expect(blockchain.validateChain()).to.be.an('array').that.is.not.empty;
    expect(blockchain.validateChain()).to.deep.include({index:2,error:"Data has been manipulated"})
  });
  
  it('should not validate is the chain is tampered with', () => {
    let blockchain = new Blockchain(0); // build a new blockchain
    blockchain.addData({ 'important': 'some important data' });
    blockchain.addBlock();
    blockchain.getChain()[1].previous_hash = "1" // repoint the previous hash
    expect(blockchain.validateChain()).to.be.an('array').that.is.not.empty;
    expect(blockchain.validateChain()).to.deep.include({index:2,error:"Data has been manipulated"})
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
  validateChain(): any[] {
    let valid = [];
    this.getChain().forEach((block, idx, arr) => {
      // the hash of the the block should be correct
      if (block.hash !== this.hash(block)) {
        valid.push({ index: block.index, error: "Data has been manipulated" });
      }
      // the previous_hash should equal the hash of the next previous bloack
      if (arr[idx + 1] && arr[idx + 1].previous_hash !== block.hash) {
        valid.push({ index: block.index, error: "Chaine has been manipulated to " + arr[idx + 1] });
      }
    });
    return valid;
  }
```

Here we have a function, that loops through each block od the chain and does two things.

Firstly it compares the actual hash stored on the block, with a new hash we create from the contects of the block, if these hashes don't match, we have a problem, our block has been tampered with.  
Secondly it compares the previous hash stored on the next block in the sequence, with this blocks actual hash.  If these don't match, then we know the chain must have tanpered with in som way.

In either case we add to our "valid" array, and once we've gone through the whole chain, we return the array which will either be empty (=no issues) or will have a list of all the issues on the chain.

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
So far on our simple chain a block can be added with no effort at all.  However, in reality adding blocks to a chain has to incur some level of "cost" - this is primarliy there to mitigate [Sybil Attacks](https://en.wikipedia.org/wiki/Sybil_attack).
We can think of this as provding some level of "skin in the game", and making it harder to add blocks, also goes part way to helping (tho not mitigating) the [51% problem](https://cipher.com/blog/how-blockchain-can-be-hacked-the-51-rule-and-more/)

Both Blockchain and Etherum (as of [Feb 2022](https://ethereum.org/en/upgrades/merge/)), use Proof of Work algorithms to ensure
A Proof of Work algorithm is how new Blocks are created or mined on the blockchain - there are different ways to do this and like the rest of the tutorial, will of course keep it simple.

## Example

Our Proof of Work will require us to when engaging in the hashing function to satisfy the the resultant hash start with the correct minimum amount of leading zeroes. 
For example, if we set our "difficulty" (by which we mean the number of leading zeros) for the hash to 19 the we need to keep hashing our data until we get a result like 00000000000000000008eddcaf078f12c69a439dde30dbb5aac3d9d94e9c18f6.

However, we know we can't change the actual block data, so how do we do ths?

We need to add a special element to our block called the "nonce" ... this is basically our "fiddle factor", and by incrementing the value of the nonce, and recalculating the hash, and repeat, and repeat ... at some point, we will get our desired hash. 
You can probaly see that the higher the "difficulty", the longer this will take ... we'll code the changes, and then you can try this out!

So first things first.... you guess it ... let's add some tests :-)

```JavaScript
  describe('The blockchain mining and nonce', () => {
    let blockchain = new Blockchain(2); // build a new blockchain
    let clock;
    let now = new Date();
  
    beforeEach(() => {
      clock = sinon.useFakeTimers(now.getTime());
    });
    afterEach(() => {
      clock.restore();
    });
  
    it('should have a nonce > 0', () => {
      let data = { 'important': 'some important data' };
      blockchain.addData(data);
      let block = blockchain.addBlock();
      expect(block.nonce).to.greaterThan(0)
    });
  
    it('should have a hash that starts with right number of zeros', () => {
      let data = { 'important': 'some important data' };
      blockchain.addData(data);
      let block = blockchain.addBlock();
      expect(block.hash.substring(0,2)).to.equal("00");
    });
```

All this should look familiar now, and we've not even added a new function!  (We will add some changes to the addBlock() function)
If you look closely, you will see two small changes 
* we're now sending a number on our blockchain construction .. this is the ```difficulty``` 
* we've got a new element in our block .. ```block.nonce```

### Add the Nonce
At the top of our class, we need to change the Block interface, and add a new element, as below

```Javascript
interface Block {  // our block
  index: number;
  timestamp: number;
  data: Array<Object>;
  hash: string;
  previous_hash: string;
  nonce: number;
}
```

We also need to make sure that when we add blocks, we setting the nonce to an initial value, so we also need to change the block creation in addBlock()

```Javascript
    let block: Block = {
      'index': this.chain.length + 1,  //Javascript arrays start @ 0
      'timestamp': Date.now(),
      'data': this.blockData,
      'hash': '0',//create with empty hash
      'previous_hash': (this.chain.length > 0) ? this.hash(this.getChain().slice().pop()) : '1',
      'nonce': 0  // set the nonce to 0
    }
```

### Add the difficulty

We will change our constructor, and set a global variable to hold our difficulty.
 
```Javascript
export class Blockchain {

  chain = [];  //holds the whole chain
  blockData = [];  //holds the data we want to add to a block
  difficulty = 0;  // global var for holding the difficulty

  //this will initialise the blockchain (Genesis)
  constructor(difficulty: number) { // change the constructor to accept a number
    this.difficulty = difficulty;  // set the difficulty from the constructor number
    this.addBlock();
  }
  ....
```

Ok, so far that's straighforward.  We've added a "nonce" and "difficulty" to our blockchain, so our test will now run ... but will still fail.  
So let's fix that.

### Add the mining

3 steps to add mining.

#### 1 Mining function
We'll add the following function right after the current hash() function
```Javascript
  private mineBlock(block: Block, difficulty: number) {
    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      block.nonce++;
      block.hash = this.hash(block);
    }
```
What this does is enter a loop, checking the leading number of 0's equals the difficulty, of not, then increment the block nonce, and rehash.  
Once the difficulty is matched, we're done.


#### 2 Add the nonce to the hashing function
We of course need to make sure the nonce is part of the hashing function.  So we change the hash function to use it.
```Javascript
  private hash(block: Block) {
    let hash = crypto.createHash('sha256').update(block.previous_hash + block.timestamp + JSON.stringify(block.data) + block.nonce).digest('hex');
    return hash;
  }
```
#### 3 Add mining to our addBlock() function
Finally, we need to make sure that as part of adding the block, we need to mine.. so we just need to call our new function as part of the addBlock() process.
```Javascript
...
    block.hash = this.hash(block); 

    this.mineBlock(block, this.difficulty); // call our new mine function, before we complete the block addition.

    this.blockData = [];
...
```

And there ... we're done.


## Things we changed

Add a function to validate the chain  
  Simple checks
  * does the hash still represent the block (will show if the hash or contents have been tampered with); 
  * does the previous_hash (as set) match the previous block (Will show if the chain has been tampered with)

We've done some mining by using a Proof OF Work algorithm  
* Add nonce to block
* mining function added - and included when adding block




