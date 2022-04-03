import { Blockchain } from "../day2/blockchain.day2.js"

class Newtoin {
    private static _instance: Newtoin;

    blockchain: Blockchain;
    private constructor() {
        this.blockchain = new Blockchain(3);
    }
    static add() {
        if (this._instance) {
            return this._instance
        }
        this._instance = new Newtoin();
        return this._instance
    }
}
export default Newtoin
