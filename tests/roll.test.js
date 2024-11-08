const Roll = require('../src/Roll');

describe('roll', () => {
    it('initialises roll', () => {
        const roll = new Roll();
        roll.setPins(1);
        roll.setRollNumber(1);
        expect(roll.getPins()).toEqual(1);
        expect(roll.getRollNumber()).toEqual(1);
    });
    it('initialises empty roll', () => {
        const roll = new Roll();
        expect(roll.getPins()).toBeUndefined();
        expect(roll.getRollNumber()).toBeUndefined();
    });
    it('throws error if invalid pin value is set', () => {
        expect(() => new Roll(11, 1)).toThrowError("Pins number must be between 0 and 10");
        expect(() => new Roll(-5, 1)).toThrowError("Pins number must be between 0 and 10");
    });
    it('throws error if invalid roll value is set', () => {
        expect(() => new Roll(5, 7)).toThrowError("Roll number must be between 1 and 3");
        expect(() => new Roll(5, 0)).toThrowError("Roll number must be between 1 and 3");
    });
    it('throws error if invalid pin value is set through setter method', () => {
        const roll = new Roll();
        expect(() => roll.setPins(-1)).toThrowError("Pins number must be between 0 and 10");
        expect(() => roll.setPins(11)).toThrowError("Pins number must be between 0 and 10");
    });
    it('throws error if invalid roll value is set through setter', () => {
        const roll = new Roll();
        expect(() => roll.setRollNumber(0)).toThrowError("Roll number must be between 1 and 3");
        expect(() => roll.setRollNumber(-1)).toThrowError("Roll number must be between 1 and 3");
        expect(() => roll.setRollNumber(12)).toThrowError("Roll number must be between 1 and 3");
    });
})