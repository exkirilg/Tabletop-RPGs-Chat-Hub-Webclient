const DiceRoll = class {
    #position;
    #dice;
    #result;

    constructor(position, dice, result) {
        this.#position = position;
        this.#dice = dice;
        this.#result = result;
    }

    getPosition() {
        return this.#position;
    };

    getDice() {
        return this.#dice;
    };

    getResult() {
        return this.#result;
    };

    compare(otherRoll) {
        if (this.#position < otherRoll.getPosition()) return -1;
        else if (this.#position > otherRoll.getPosition()) return 1;
        else return 0;
    }
};

export default DiceRoll;
