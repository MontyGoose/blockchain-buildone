import { Blockchain } from "../day2/blockchain.day2.js";
var Newtoin = /** @class */ (function () {
    function Newtoin() {
        this.blockchain = new Blockchain(3);
    }
    Newtoin.add = function () {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new Newtoin();
        return this._instance;
    };
    return Newtoin;
}());
export default Newtoin;
