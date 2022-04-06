import Newtoin from "./newtoin.js";
var bob = Newtoin.add();
bob.blockchain.addData({ bob: 300 });
bob.blockchain.addBlock();
// console.log(bob.blockchain.getChain());
// console.log("-".repeat(20))
var janet = Newtoin.add();
var maggie = Newtoin.add();
// console.log(janet.blockchain.getChain());
// console.log("-".repeat(20))
maggie.blockchain.addData({ maggie: 200, janet: 10 });
maggie.blockchain.addBlock();
// console.log(bob.blockchain.getChain());
// console.log("-".repeat(20))
bob.blockchain.addData({ bob: 290, janet: 20 });
maggie.blockchain.addData({ maggie: 190, janet: 30 });
// mining .... fastest wins .... 
// still needs consenus to add  ()
janet.blockchain.addBlock();
console.log(bob.blockchain.getChain());
console.log("-".repeat(20));
console.log(JSON.stringify(bob.blockchain.getChain().slice(-1).pop().data));
