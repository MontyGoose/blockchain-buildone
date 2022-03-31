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


