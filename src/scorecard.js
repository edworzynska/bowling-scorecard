const Frame = require('./Frame');

class Scorecard {

    constructor() {
        this.frames = [];
        for (let i = 1; i <= 10; i++){
            this.frames.push(new Frame(i));
        }
        this.totalPoints = this.getTotalPoints();
    }
    roll(pins){
        const currentFrame = this.getCurrentFrame();
        if (!currentFrame){
            throw new Error(`Cannot roll: game ended.`);
        }
        currentFrame.addRoll(pins);
        this.updateScores();
    }

    getCurrentFrame(){
         return this.frames.find(frame => !frame.isFrameComplete());
    }
    updateScores(){
        for (let i = 0; i < this.frames.length; i++){
            const frame = this.frames[i];
            if (frame.isFrameComplete() && frame.getScore() === 0){
                if (frame.isStrike()){
                    const strikePoints = this.getStrikePoints(i);
                    if (strikePoints > 0) {
                        frame.setScore(strikePoints);
                    }
                }
                else if (frame.isSpare()){
                    const sparePoints = this.getSparePoints(i);
                    if (sparePoints > 0){
                        frame.setScore(sparePoints);
                    }
                }
                else {
                    frame.setScore(frame.getPinsInFrame());
                }
            }
        }
    }
    getStrikePoints(i) {
        if (i === 9){
            return this.frames[9].getPinsInFrame();
        }
        const nextFrame = this.frames[i + 1];
        if (!nextFrame || nextFrame.getRolls().length === 0) {
            return 0;
        }
        const rollsInNextFrame = nextFrame.getRolls();

        if (rollsInNextFrame.length > 1){
            return 10 + rollsInNextFrame[0].getPins() +
                rollsInNextFrame[1].getPins();
            }

        if (rollsInNextFrame[0].getPins() === 10) {
            const secondNextFrame = this.frames[i + 2];

            if (secondNextFrame && secondNextFrame.getRolls().length > 0){
                return 20 + secondNextFrame.getRolls()[0].getPins();
                }
            }
        else return 0;
    }
    getSparePoints(i){
        const nextFrame = this.frames[i + 1];

        if (!nextFrame || nextFrame.getRolls().length === 0) {
            return 0;
        }
        else {
            const rollsInNextFrame = nextFrame.getRolls();
            return 10 + rollsInNextFrame[0].getPins();
        }
    }
    getTotalPoints(){
         return this.frames.reduce((totalPoints, frame) => totalPoints += frame.getScore(), 0);
    }
    getScoreCard(){
        return Scorecard;
    }
}

module.exports = Scorecard;