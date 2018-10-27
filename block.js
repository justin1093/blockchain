const SHA256 = require("crypto-js/sha256");

class Block{
    constructor (index, timestamp,transaction,previousHash=''){
        this.index=index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.transaction)+this.nonce).toString();
    }

    mineNewBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    console.log("A new block was mined with with hash "+this.hash)
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0,"01/02/2018","This is the genesis block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
       //newBlock.hash = newBlock.calculateHash();
        newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock);
    }   

    checkBlockChainValid(){
        for(let i = 1 ; i<this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(previousBlock.hash !== previousBlock.hash){
                return false;
            }

        }

        return true
    }
}

let block1 = new Block(1,"02/02/2018",{mybalance : 100});
let block2 = new Block(2,"03/02/2018",{mybalance : 50});

let myBlockChain = new BlockChain();

console.log("First block creation");
myBlockChain.addBlock(block1);
console.log("Second block creation");
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain,null,4));
console.log("Validation check for the block chian : "+myBlockChain.checkBlockChainValid());

//myBlockChain.chain[1].data = {mybalance : 5000};
//console.log("Validation check for the block chian after hacking : "+myBlockChain.checkBlockChainValid());