const Roll = require('./Roll');

class Frame {

    constructor(frameNumber) {
        if (frameNumber < 1 || frameNumber > 10) {
            throw new Error("Frame number must be between 1 and 10");
        }
        this.frameNumber = frameNumber;
        this.rolls = [];
        this.score = 0;
    }

    addRoll(pins){
        if (this.isFrameComplete()){
            throw new Error("No rolls left in the frame.")
        }
        const rollNumber = this.rolls.length + 1;
        const roll = new Roll(pins, rollNumber);
        this.rolls.push(roll);
    }

    isStrike(){
        return this.rolls.length > 0 && this.rolls[0].getPins() === 10;
    }

    isSpare(){
        return this.rolls.length >= 2 && (this.rolls[0].getPins() + this.rolls[1].getPins()) === 10;
    }

    getFrameNumber() {
        return this.frameNumber;
    }

    isFrameComplete(){
        if (this.frameNumber < 10) {
            return this.rolls.length === 2 || this.isStrike();
        }
        else {
            if (this.isStrike() || this.isSpare()){
                return this.rolls.length === 3;
            }
            return this.rolls.length === 2;
        }
    }

    setFrameNumber(value) {
        if (value > 10 || value < 1) {
            throw new Error("Frame number must be between 1 and 10");
        }
        this.frameNumber = value;
    }
    getPinsInFrame() {
        return this.rolls.reduce((sum, roll) => sum += roll.getPins(), 0);
    }
    getRolls(){
        return this.rolls;
    }
    setScore(value){
        this.score = value;
    }
    getScore(){
        return this.score;
    }
}

module.exports = Frame;