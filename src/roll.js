class Roll {

    constructor(pins, rollNumber) {
        if (pins < 0 || pins > 10) {
            throw new Error("Pins number must be between 0 and 10");
        }
        if (rollNumber < 1 || rollNumber > 3) {
            throw new Error("Roll number must be between 1 and 3");
        }
        this.pins = pins;
        this.rollNumber = rollNumber;
    }

    getPins() {
        return this.pins;
    }

    getRollNumber() {
        return this.rollNumber;
    }

    setPins(value) {
        if (value < 0 || value > 10) {
            throw new Error("Pins number must be between 0 and 10");
        }
        this.pins = value;
    }

    setRollNumber(value) {
        if (value < 1 || value > 3) {
            throw new Error("Roll number must be between 1 and 3");
        }
        this.rollNumber = value;
    }
}

module.exports = Roll;