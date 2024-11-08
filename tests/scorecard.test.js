const Scorecard = require('../src/Scorecard');

describe('Scorecard', () => {
    it ('initialises new scorecard with and assigns frames', () =>{
        const scorecard = new Scorecard();
        expect(scorecard.frames.length).toEqual(10);
        expect(scorecard.frames[0].getFrameNumber()).toEqual(1);
        expect(scorecard.frames[9].getFrameNumber()).toEqual(10);
    });
    it ('adds rolls in consecutive frames if strikes', () => {
        const scorecard = new Scorecard();
        scorecard.roll(10);
        scorecard.roll(10);
        scorecard.roll(10);
        const currentFrame = scorecard.getCurrentFrame();
        expect(currentFrame.getFrameNumber()).toEqual(4);
    });
    it ('adds rolls in consecutive frames', () => {
        const scorecard = new Scorecard();
        scorecard.roll(5);
        scorecard.roll(4);
        scorecard.roll(3);
        const currentFrame = scorecard.getCurrentFrame();
        expect(currentFrame.getFrameNumber()).toEqual(2);
        expect(currentFrame.isFrameComplete()).toEqual(false);
    });
    it ('adds frames with strikes and updates scores', () => {
        const scorecard = new Scorecard();
        scorecard.roll(10);
        scorecard.roll(10);
        scorecard.roll(10);
        scorecard.roll(10);
        expect(scorecard.frames[0].getScore()).toEqual(30);
    });
    it ('adds frame with strike and 2 next rolls and updates scores', () => {
        const scorecard = new Scorecard();
        scorecard.roll(10);
        scorecard.roll(2);
        scorecard.roll(4);
        expect(scorecard.frames[0].getScore()).toEqual(16);
    });
    it ('adds frame with strike and 2 next rolls 0 and updates scores', () => {
        const scorecard = new Scorecard();
        scorecard.roll(10);
        scorecard.roll(0);
        scorecard.roll(0);
        expect(scorecard.frames[0].getScore()).toEqual(10);
    });
    it ('returns 0 if theres only 1 roll after strike', () => {
        const scorecard = new Scorecard();
        scorecard.roll(10);
        scorecard.roll(5);
        expect(scorecard.frames[0].getScore()).toEqual(0);
    });
    it ('adds frame with spare and updates scores', () => {
        const scorecard = new Scorecard();
        scorecard.roll(5);
        scorecard.roll(5);
        scorecard.roll(2);
        expect(scorecard.frames[0].getScore()).toEqual(12);
    });
    it ('returns 0 if theres no roll after spare', () => {
        const scorecard = new Scorecard();
        scorecard.roll(5);
        scorecard.roll(5);
        expect(scorecard.frames[0].getScore()).toEqual(0);
    });
    it ('returns pin number if regular rolls are made', () => {
        const scorecard = new Scorecard();
        scorecard.roll(1);
        scorecard.roll(3);
        scorecard.roll(5);
        scorecard.roll(1);
        expect(scorecard.frames[0].getScore()).toEqual(4);
        expect(scorecard.frames[1].getScore()).toEqual(6);
    });
    it ('handles 10th frame when strike', () => {
        const scorecard = new Scorecard();
        scorecard.roll(10); //1st frame
        scorecard.roll(10); //2nd frame
        scorecard.roll(10); //3rd frame
        scorecard.roll(10); //4th frame
        scorecard.roll(10); //5th frame
        scorecard.roll(10); //6th frame
        scorecard.roll(10); //7th frame
        scorecard.roll(10); //8th frame
        scorecard.roll(10); //9th frame
        scorecard.roll(10); //10th frame
        scorecard.roll(10); //10th frame
        scorecard.roll(10); //10th frame
        expect(scorecard.frames[0].getScore()).toEqual(30);
        expect(scorecard.frames[1].getScore()).toEqual(30);
        expect(scorecard.frames[8].getScore()).toEqual(30);
        expect(scorecard.frames[9].getScore()).toEqual(30);
    });
})