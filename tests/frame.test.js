const Frame = require("../src/Frame");

describe('Frame', () => {
    let frame;
    it('initialises frame', () => {
        frame = new Frame(1);
        expect(frame.getFrameNumber()).toEqual(1);
        expect(frame.getRolls()).toEqual([]);
        expect(frame.getPinsInFrame()).toEqual(0);
    });
    it('throws error if initialising frame with negative frame number', () => {
        frame = new Frame();
        expect(() => frame.setFrameNumber(-5)).toThrow("Frame number must be between 1 and 10");
    });
    it('throws error if initialising frame with frame number above 10', () => {
        frame = new Frame();
        expect(() => frame.setFrameNumber(11)).toThrow("Frame number must be between 1 and 10");
    });
    it('throws error if initialising frame with invalid number with constructor', () => {
        expect(() => new Frame(11)).toThrow("Frame number must be between 1 and 10");
        expect(() => new Frame(0)).toThrow("Frame number must be between 1 and 10");
    });
    it('initialises frame and changes frame number', () => {
        frame = new Frame();
        frame.setFrameNumber(5);
        expect(frame.getFrameNumber()).toEqual(5);
    });
    it('initialises frame and changes frame number', () => {
        frame = new Frame();
        frame.setFrameNumber(5);
        expect(frame.getFrameNumber()).toEqual(5);
    });
    it('adds roll with a strike', () => {
        frame = new Frame(1);
        frame.addRoll(10);
        expect(frame.isStrike()).toEqual(true);
        expect(frame.isSpare()).toEqual(false);
        expect(frame.isFrameComplete()).toEqual(true);
    });
    it('throws error if trying to add roll with invalid number of pins', () => {
        frame = new Frame();
        expect(() => frame.addRoll(11)).toThrowError("Pins number must be between 0 and 10");
        expect(() => frame.addRoll(-1)).toThrowError("Pins number must be between 0 and 10");
    });
    it('throws error if adding roll once frame is completed', () => {
        frame = new Frame(1);
        frame.addRoll(10);
        expect(frame.isFrameComplete()).toEqual(true);
        expect(() => frame.addRoll(5)).toThrowError("No rolls left in the frame.");
    });
    it('allows to roll for the 3rd time in 10th frame if strike', () =>{
        frame = new Frame(10);
        frame.addRoll(10);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(10);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(10);
        expect(frame.isFrameComplete()).toEqual(true);
    });
    it('allows to roll for the 3rd time in 10th frame if spare', () =>{
        frame = new Frame(10);
        frame.addRoll(8);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(2);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(10);
        expect(frame.isFrameComplete()).toEqual(true);
    });
    it('allows to roll 2 times in 10th frame if no strike or spare', () =>{
        frame = new Frame(10);
        frame.addRoll(3);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(2);
        expect(frame.isFrameComplete()).toEqual(true);
    });
    it('allows to roll 2 times in frames 1-9 if no strike or spare', () =>{
        frame = new Frame(2);
        frame.addRoll(3);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(2);
        expect(frame.isFrameComplete()).toEqual(true);
        expect(frame.isStrike()).toEqual(false);
        expect(frame.isSpare()).toEqual(false);
    });
    it('allows to roll 2 times in frames 1-9 if spare', () =>{
        frame = new Frame(5);
        frame.addRoll(3);
        expect(frame.isFrameComplete()).toEqual(false);
        frame.addRoll(7);
        expect(frame.isFrameComplete()).toEqual(true);
        expect(frame.isStrike()).toEqual(false);
        expect(frame.isSpare()).toEqual(true);
    });
});
